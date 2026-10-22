"use client";

import { useEffect, useRef, useState } from "react";

/** Keep load state isolated when the source changes (for example, worship tabs). */
export function LoadingPhoto(props: {
  src: string;
  alt: string;
  className: string;
}) {
  return <Photo key={props.src} {...props} />;
}

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  const image = useRef<HTMLImageElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Cached images may finish before React attaches its load handler.
    if (image.current?.complete) setSettled(true);
  }, []);

  return (
    <span className="loading-photo" aria-busy={!settled}>
      <img
        ref={image}
        src={src}
        alt={alt}
        className={className}
        onLoad={() => setSettled(true)}
        onError={() => setSettled(true)}
      />
      {!settled && (
        <span
          className="image-skeleton skeleton-block delayed-skeleton"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
