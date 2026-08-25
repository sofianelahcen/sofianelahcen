"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { ArchiveProject } from "@/lib/content";

const pad = (value: number) => String(value).padStart(2, "0");

export function Lightbox({
  project,
  onClose,
}: {
  project: ArchiveProject;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = project.items.length;
  const item = project.items[index];

  useMountEffect(() => {
    dialogRef.current?.showModal();
  });

  const step = (delta: number) =>
    setIndex((current) => (current + delta + total) % total);

  return (
    <dialog
      ref={dialogRef}
      className="lightbox"
      aria-label={project.title}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current?.close();
      }}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div
        className="lightbox-shell"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialogRef.current?.close();
        }}
      >
        <header className="lightbox-head">
          <h1 className="lightbox-title">
            {project.title}
            <span className="lightbox-year">{project.year}</span>
          </h1>
          <button
            type="button"
            className="lightbox-close"
            onClick={() => dialogRef.current?.close()}
          >
            CLOSE
          </button>
        </header>

        <div className="lightbox-stage">
          <figure key={item.src} className="lightbox-figure">
            {item.kind === "video" ? (
              <video
                className="media-fill"
                src={item.src}
                poster={item.poster}
                autoPlay
                loop
                muted
                playsInline
                aria-label={item.alt}
              />
            ) : (
              <Image
                className="media-fill"
                src={item.src}
                alt={item.alt}
                fill
                sizes="90vw"
                priority
              />
            )}
          </figure>

          {total > 1 ? (
            <div className="lightbox-zones">
              <button
                type="button"
                className="zone zone-prev"
                onClick={() => step(-1)}
              >
                <span className="sr-only">Previous image</span>
              </button>
              <button
                type="button"
                className="zone zone-next"
                onClick={() => step(1)}
              >
                <span className="sr-only">Next image</span>
              </button>
            </div>
          ) : null}
        </div>

        <footer className="lightbox-foot caption">
          <p className="lightbox-credits">
            {project.credits.map((credit) => (
              <span key={credit.name}>
                {credit.name}
                <br />
              </span>
            ))}
          </p>
          <p className="lightbox-counter" aria-live="polite">
            <span className="lightbox-counter-current">{pad(index + 1)}</span>
            <span className="lightbox-counter-total"> / {pad(total)}</span>
          </p>
        </footer>
      </div>
    </dialog>
  );
}
