/**
 * Splits text into letters that can rise out of per-word masks (animated by
 * SectionEntrance / HeroEntrance). Screen readers get the plain text once;
 * the split letters are hidden from them. Word masks keep wrapped lines tidy.
 */
export function SplitChars({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, w) => (
          <span key={`${word}-${w}`}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-top">
              {[...word].map((char, i) => (
                <span key={i} data-split-char className="inline-block">
                  {char}
                </span>
              ))}
            </span>
            {w < words.length - 1 ? " " : null}
          </span>
        ))}
      </span>
    </>
  );
}
