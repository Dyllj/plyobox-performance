import { gymPhotos } from "../../data/site";
import { stagger } from "../../lib/stagger";
import Photo from "../site/Photo";
import SectionHeading from "../site/SectionHeading";

export default function GymSection() {
  return (
    <section aria-labelledby="gym-title" className="section section-alt" id="gym">
      <div className="section-wrap">
        <SectionHeading
          eyebrow="Inside the gym"
          intro="A closer look at the space where you'll put in the work."
          title="Space to lift, jump and sprint."
          titleId="gym-title"
        />
        <div className="gym-mosaic">
          {gymPhotos.map((photo, i) => (
            <div
              className={`gym-cell gym-cell-${photo.id}`}
              data-reveal="scale"
              key={photo.id}
              style={stagger(i)}
            >
              <Photo
                alt={photo.alt}
                className="gym-photo"
                label={photo.label}
                src={photo.src}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
