import { ArrowRight, MapPin } from "lucide-react";
import { heroPhotos, siteInfo } from "../../data/site";
import { stagger } from "../../lib/stagger";
import Photo from "../site/Photo";

const headlineLines = ["Train", "explosive.", "Move better."];

export default function HeroSection() {
  return (
    <section aria-labelledby="hero-title" className="hero section-wrap" id="home">
      <span aria-hidden="true" className="hero-glow hero-glow-a" />
      <span aria-hidden="true" className="hero-glow hero-glow-b" />

      <div className="hero-copy">
        <p className="eyebrow rise">Plyobox Performance Gym · Mahayag</p>
        <h1 id="hero-title">
          {headlineLines.map((line, i) => (
            <span
              className={i === 1 ? "hero-line hero-line-accent" : "hero-line"}
              key={line}
              style={stagger(i)}
            >
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero-description rise" style={stagger(3)}>
          A performance gym for real strength and power. Pay by the day or by the month, then
          scan in when it&apos;s time to train.
        </p>
        <div className="button-row rise" style={stagger(4)}>
          <a className="button button-lime" href="#membership">
            See membership <ArrowRight aria-hidden="true" />
          </a>
          <a className="button button-outline" href="#trainers">
            Find a trainer
          </a>
        </div>
        <p className="hero-location rise" style={stagger(5)}>
          <MapPin aria-hidden="true" />
          {siteInfo.location}, {siteInfo.country}
        </p>
      </div>

      <div aria-label="Inside the gym" className="hero-collage rise" style={stagger(2)}>
        {heroPhotos.map((photo) => (
          <Photo
            className={`hero-photo hero-photo-${photo.id}`}
            key={photo.id}
            label={photo.label}
            src={photo.src}
            alt={photo.alt}
          />
        ))}
        <div className="photo-note">
          <span className="note-dot" />
          <span>
            YOUR NEXT SESSION
            <strong>Starts when you do.</strong>
          </span>
        </div>
      </div>
    </section>
  );
}
