"use client";

import { useRef, useState } from "react";
import { useMountEffect } from "@/hooks/useMountEffect";
import type { Media } from "@/lib/media";

export function useVideoAspect(media: Media) {
  const [measured, setMeasured] = useState<number | null>(null);

  const onLoadedMetadata = (event: React.SyntheticEvent<HTMLVideoElement>) => {
    const { videoWidth, videoHeight } = event.currentTarget;
    if (videoWidth > 0 && videoHeight > 0) setMeasured(videoWidth / videoHeight);
  };

  return {
    aspect: measured ?? media.width / media.height,
    onLoadedMetadata,
  };
}

export function VideoFill({
  media,
  onLoadedMetadata,
  withSound = false,
  ariaHidden = false,
}: {
  media: Media;
  onLoadedMetadata?: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  withSound?: boolean;
  ariaHidden?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useMountEffect(() => {
    if (withSound) return;
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else if (!video.paused) {
          video.pause();
        }
      },
      { rootMargin: "150px", threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  });

  return (
    <video
      ref={ref}
      className="media-fill"
      src={media.src}
      poster={media.poster}
      loop
      playsInline
      muted={!withSound}
      autoPlay={withSound}
      controls={withSound}
      preload={withSound ? "metadata" : "none"}
      aria-hidden={ariaHidden || undefined}
      aria-label={ariaHidden ? undefined : media.alt}
      onLoadedMetadata={onLoadedMetadata}
      onCanPlay={(event) => {
        if (!withSound) return;
        const video = event.currentTarget;
        video.muted = false;
        video.volume = 1;
        void video.play().catch(() => {
          video.muted = true;
          void video.play().catch(() => {});
        });
      }}
    />
  );
}
