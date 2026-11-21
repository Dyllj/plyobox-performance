import { stagger } from "../../lib/stagger";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  titleId?: string;
  intro?: string;
}

export default function SectionHeading({ eyebrow, title, titleId, intro }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <p className="eyebrow" data-reveal>
        {eyebrow}
      </p>
      <h2 data-reveal id={titleId} style={stagger(1)}>
        {title}
      </h2>
      {intro && (
        <p className="section-intro" data-reveal style={stagger(2)}>
          {intro}
        </p>
      )}
    </div>
  );
}
