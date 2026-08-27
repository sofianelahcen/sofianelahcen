"use client";

import { useState } from "react";
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
}: {
  media: Media;
  onLoadedMetadata: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
  withSound?: boolean;
}) {
  return (
    <video
      className="media-fill"
      src={media.src}
      poster={media.poster}
      autoPlay
      loop
      controls
      muted={!withSound}
      playsInline
      aria-label={media.alt}
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
