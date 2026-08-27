"use client";

import { useState } from "react";
import type { Media } from "@/lib/media";

export function useVideoAspect(media: Media) {
  const [measured, setMeasured] = useState<number | null>(null);

  const onLoadedMetadata = (
    event: React.SyntheticEvent<HTMLVideoElement>,
  ) => {
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
}: {
  media: Media;
  onLoadedMetadata: (event: React.SyntheticEvent<HTMLVideoElement>) => void;
}) {
  return (
    <video
      className="media-fill"
      src={media.src}
      poster={media.poster}
      autoPlay
      loop
      muted
      playsInline
      preload="metadata"
      aria-label={media.alt}
      onLoadedMetadata={onLoadedMetadata}
    />
  );
}
