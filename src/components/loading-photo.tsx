"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

/** Keep load state isolated when the source changes (for example, worship tabs). */
export function LoadingPhoto(props: {
  src: string;
  alt: string;
  className: string;
  optimized?: boolean;
  sizes?: string;
}) {
  return <Photo key={props.src} {...props} />;
}

function Photo({
  src,
  alt,
  className,
  optimized = false,
  sizes,
}: {
  src: string;
  alt: string;
  className: string;
  optimized?: boolean;
  sizes?: string;
}) {
  const image = useRef<HTMLImageElement>(null);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    // Cached images may finish before React attaches its load handler.
    if (image.current?.complete) setSettled(true);
  }, []);

  return (
    <span className="loading-photo" aria-busy={!settled}>
      {optimized ? (
        <Image
          fill
          sizes={sizes ?? "100vw"}
          ref={image}
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setSettled(true)}
          onError={() => setSettled(true)}
        />
      ) : (
        <img
          ref={image}
          src={src}
          alt={alt}
          className={className}
          onLoad={() => setSettled(true)}
          onError={() => setSettled(true)}
        />
      )}
      {!settled && (
        <span
          className="image-skeleton skeleton-block delayed-skeleton"
          aria-hidden="true"
        />
      )}
    </span>
  );
}
