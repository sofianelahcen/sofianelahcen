"use client";

import { useRef, useState } from "react";
import { MediaItem } from "./MediaItem";
import { countLabel } from "@/lib/plural";
import { aspectOf } from "@/lib/media";
import type { Slide } from "@/lib/content";
import type { CSSProperties } from "react";

const SWIPE_THRESHOLD = 40;

function SlideCaption({ slide }: { slide: Slide }) {
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
  const caption = slides.find((slide) => slide.title || slide.credits);

  const swipeOrigin = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const guardedStep = (delta: number) => {
    if (didSwipe.current) {
      didSwipe.current = false;
      return;
    }
    step(delta);
  };

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
      <div
        className="slideshow-stage"
        style={
          { "--active-aspect": aspectOf(activeSlide.media) } as CSSProperties
        }
        onTouchStart={(event) => {
          swipeOrigin.current = event.touches[0].clientX;
          didSwipe.current = false;
        }}
        onTouchEnd={(event) => {
          const origin = swipeOrigin.current;
          swipeOrigin.current = null;
          if (origin === null || total < 2) return;
          const travelled = event.changedTouches[0].clientX - origin;
          if (Math.abs(travelled) < SWIPE_THRESHOLD) return;
          didSwipe.current = true;
          step(travelled < 0 ? 1 : -1);
        }}
      >
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
          <div
            className={
              activeSlide.media.kind === "video"
                ? "slideshow-zones has-controls"
                : "slideshow-zones"
            }
          >
            <button
              type="button"
              className="zone zone-prev"
              onClick={() => guardedStep(-1)}
            >
              <span className="sr-only">Previous image</span>
            </button>
            <button
              type="button"
              className="zone zone-next"
              onClick={() => guardedStep(1)}
            >
              <span className="sr-only">Next image</span>
            </button>
          </div>
        ) : null}
      </div>

      {caption ? (
        <div className="caption slideshow-caption">
          <SlideCaption slide={caption} />
        </div>
      ) : null}
    </div>
  );
}
