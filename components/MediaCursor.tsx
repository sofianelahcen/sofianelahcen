"use client";

import { useRef } from "react";
import type { MouseEvent, RefObject } from "react";

export function useMediaCursor() {
  const ref = useRef<HTMLSpanElement>(null);

  const onMouseMove = (event: MouseEvent<HTMLElement>) => {
    const cursor = ref.current;
    if (!cursor) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    cursor.style.setProperty("--cursor-x", `${event.clientX - bounds.left}px`);
    cursor.style.setProperty("--cursor-y", `${event.clientY - bounds.top}px`);
  };

  return { ref, onMouseMove };
}

export function MediaCursor({
  cursorRef,
  current,
  total,
}: {
  cursorRef: RefObject<HTMLSpanElement | null>;
  current: number;
  total: number;
}) {
  return (
    <span ref={cursorRef} className="media-cursor caption" aria-hidden>
      {current}/{total}
    </span>
  );
}
