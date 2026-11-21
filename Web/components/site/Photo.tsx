interface PhotoProps {
  /** Describes the photo; shown as the placeholder caption until `src` is set. */
  label: string;
  /** Drop a real image path (e.g. "/images/floor.jpg") to replace the placeholder. */
  src?: string;
  alt?: string;
  className?: string;
}

export default function Photo({ label, src, alt, className = "" }: PhotoProps) {
  const classes = `photo ${className}`.trim();

  if (src) {
    return (
      <div className={classes}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export */}
        <img alt={alt ?? label} decoding="async" loading="lazy" src={src} />
      </div>
    );
  }

  return (
    <div aria-label={`Placeholder for ${label.toLowerCase()}`} className={classes} role="img">
      <span aria-hidden="true" className="photo-label">
        {label}
      </span>
    </div>
  );
}
