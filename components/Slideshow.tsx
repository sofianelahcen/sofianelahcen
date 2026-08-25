"use client";

import { useState } from "react";
import { MediaItem } from "./MediaItem";
import { Lines } from "./Layout";
import { countLabel } from "@/lib/plural";
import type { Slide } from "@/lib/content";

function SlideCaption({ slide }: { slide: Slide }) {
  if (!slide.title && !slide.credits) return null;

  return (
    <>
      {slide.title ? (
        <>
          <b>{slide.title}</b>
          <br />
          <br />
        </>
      ) : null}
      {slide.credits?.map((credit) => (
        <span key={credit.name}>
          {credit.name}
          <br />
        </span>
      ))}
      {slide.trailingLines ? <Lines count={slide.trailingLines} /> : null}
    </>
  );
}

export function Slideshow({
  slides,
  priority = false,
}: {
  slides: Slide[];
  priority?: boolean;
}) {
  const [active, setActive] = useState(0);
  const total = slides.length;
  const step = (delta: number) =>
    setActive((current) => (current + delta + total) % total);
  const activeSlide = slides[active];

  return (
    <div
      className="slideshow"
      role="group"
      aria-roledescription="carousel"
      aria-label={countLabel(total, "image")}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") step(-1);
        if (event.key === "ArrowRight") step(1);
      }}
    >
      <div className="slideshow-stage">
        <div className="slide-list">
          {slides.map((slide, index) => {
            const isActive = index === active;
            const isAdjacent =
              index === (active + 1) % total ||
              index === (active - 1 + total) % total;

            return (
              <div
                key={slide.media.src}
                className={[
                  "slide",
                  isActive && "slide-active",
                  isAdjacent && "slide-adjacent",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden={!isActive}
              >
                <MediaItem
                  media={slide.media}
                  priority={priority && index === 0}
                />
              </div>
            );
          })}
        </div>

        {total > 1 ? (
          <div className="slideshow-zones">
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

      <div className="caption slideshow-caption" aria-live="polite">
        <SlideCaption slide={activeSlide} />
      </div>
    </div>
  );
}
