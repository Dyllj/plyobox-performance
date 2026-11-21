import { tickerWords } from "../../data/site";

/** Seamless looping ticker: two identical groups, translated by -50%. */
export default function Marquee() {
  const group = Array.from({ length: 3 }, () => tickerWords).flat();

  return (
    <div aria-hidden="true" className="marquee">
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <div className="marquee-group" key={copy}>
            {group.map((word, i) => (
              <span key={`${word}-${i}`}>
                {word} <i>◆</i>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
