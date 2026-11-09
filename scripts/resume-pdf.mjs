/**
 * Saves the /resume page as an A4 PDF in public/, using headless Chrome over the
 * DevTools protocol (no extra packages: Node's built-in WebSocket and fetch).
 *
 *   npm run dev            # or: npm run build && npm start
 *   npm run resume:pdf     # optional: npm run resume:pdf -- http://localhost:3000/resume
 *
 * Set CHROME_PATH if Chrome/Chromium is not on your PATH.
 */
import { execFileSync, spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const url = process.argv[2] ?? process.env.RESUME_URL ?? "http://localhost:3000/resume";
const out = fileURLToPath(new URL("../public/md-tayef-resume.pdf", import.meta.url));

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  for (const name of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser", "chrome"]) {
    try {
      return execFileSync("which", [name], { encoding: "utf8" }).trim();
    } catch {
      // not installed under this name
    }
  }
  const mac = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
  try {
    statSync(mac);
    return mac;
  } catch {
    return null;
  }
}

async function main() {
  const chrome = findChrome();
  if (!chrome) throw new Error("Chrome or Chromium not found. Install one, or set CHROME_PATH.");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
  } catch (error) {
    throw new Error(`Could not load ${url} (${error.message}). Start the site first: npm run dev`);
  }

  const profile = mkdtempSync(join(tmpdir(), "resume-pdf-"));
  const browser = spawn(
    chrome,
    ["--headless=new", "--disable-gpu", "--remote-debugging-port=0", `--user-data-dir=${profile}`, "about:blank"],
    { stdio: "ignore" },
  );

  try {
    // Chrome writes the port it picked to DevToolsActivePort in the profile.
    let port;
    for (let i = 0; i < 100 && !port; i++) {
      try {
        port = readFileSync(join(profile, "DevToolsActivePort"), "utf8").split("\n")[0];
      } catch {
        await sleep(100);
      }
    }
    if (!port) throw new Error("Chrome did not start its DevTools endpoint.");

    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const page = targets.find((t) => t.type === "page");
    const socket = new WebSocket(page.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => {
      socket.addEventListener("open", resolve, { once: true });
      socket.addEventListener("error", reject, { once: true });
    });

    let nextId = 0;
    const pending = new Map();
    const listeners = new Map();
    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && pending.has(message.id)) {
        const { resolve, reject } = pending.get(message.id);
        pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
      } else if (message.method && listeners.has(message.method)) {
        listeners.get(message.method)();
      }
    });
    const send = (method, params = {}) =>
      new Promise((resolve, reject) => {
        const id = ++nextId;
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params }));
      });

    await send("Page.enable");
    const loaded = new Promise((resolve) => listeners.set("Page.loadEventFired", resolve));
    await send("Page.navigate", { url });
    await loaded;
    // Let web fonts finish before printing.
    await send("Runtime.evaluate", { expression: "document.fonts.ready.then(() => true)", awaitPromise: true });

    const { data } = await send("Page.printToPDF", {
      preferCSSPageSize: true,
      printBackground: true,
      displayHeaderFooter: false,
    });
    writeFileSync(out, Buffer.from(data, "base64"));
    socket.close();
  } finally {
    browser.kill();
    await sleep(200);
    rmSync(profile, { recursive: true, force: true });
  }

  const kb = Math.round(statSync(out).size / 1024);
  console.log(`Saved ${out} (${kb} KB) from ${url}`);
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
