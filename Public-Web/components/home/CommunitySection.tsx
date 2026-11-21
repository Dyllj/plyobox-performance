import { Quote } from "lucide-react";
import { communityQuotes } from "../../data/site";
import { stagger } from "../../lib/stagger";
import SectionHeading from "../site/SectionHeading";

export default function CommunitySection() {
  return (
    <section aria-labelledby="community-title" className="section section-wrap">
      <SectionHeading
        eyebrow="Community"
        title="Members, in their words."
        titleId="community-title"
      />
      <div className="quote-grid">
        {communityQuotes.map((item, i) => (
          <figure
            className="card quote-card"
            data-reveal
            data-spotlight
            key={item.id}
            style={stagger(i)}
          >
            <Quote aria-hidden="true" className="quote-mark" />
            <div aria-hidden="true" className="quote-avatar">
              P
            </div>
            <blockquote>{item.quote}</blockquote>
            <figcaption>{item.name}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
