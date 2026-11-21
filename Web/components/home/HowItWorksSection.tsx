import { paymentMethods, steps } from "../../data/site";
import { stagger } from "../../lib/stagger";
import Marquee from "../site/Marquee";
import SectionHeading from "../site/SectionHeading";

/** 7×7 QR-style matrix: 1 = filled. Finder squares sit in three corners. */
const QR_ROWS = ["1110111", "1011101", "1110111", "0101101", "1110100", "1011011", "1110110"];
const QR_FINDER = (row: number, col: number) =>
  (row < 3 && col < 3) || (row < 3 && col > 3) || (row > 3 && col < 3);

function QrIllustration() {
  return (
    <div aria-label="QR code illustration" className="qr" role="img">
      {QR_ROWS.flatMap((rowBits, row) =>
        [...rowBits].map((bit, col) => {
          const index = row * 7 + col;
          const filled = bit === "1";
          return (
            <span
              data-data={filled && !QR_FINDER(row, col) ? "" : undefined}
              data-on={filled ? "" : undefined}
              key={index}
              style={{ "--k": index } as React.CSSProperties}
            />
          );
        }),
      )}
    </div>
  );
}

function StepVisual({ type }: { type: (typeof steps)[number]["visual"] }) {
  switch (type) {
    case "signup":
      return (
        <div aria-hidden="true" className="mock-form">
          <span className="mock-avatar" />
          <span className="mock-bar" />
          <span className="mock-bar mock-bar-short" />
          <span className="mock-btn" />
        </div>
      );
    case "payment":
      return (
        <ul aria-label="Payment options" className="pay-chips">
          {paymentMethods.map((method) => (
            <li key={method}>{method}</li>
          ))}
        </ul>
      );
    case "qr":
      return <QrIllustration />;
  }
}

export default function HowItWorksSection() {
  return (
    <>
      <Marquee />
      <section
        aria-labelledby="how-title"
        className="section section-wrap"
        id="how-it-works"
      >
        <SectionHeading
          eyebrow="How it works"
          title="From sign-up to first rep in three steps."
          titleId="how-title"
        />
        <ol className="steps-grid">
          {steps.map((step, i) => (
            <li
              className="card step-card"
              data-reveal
              data-spotlight
              key={step.id}
              style={stagger(i)}
            >
              <div className="step-visual">
                <StepVisual type={step.visual} />
              </div>
              <span className="step-number">{String(i + 1).padStart(2, "0")}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </>
  );
}
