"use client";

import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { aspectOf, type Media } from "@/lib/media";
import { useVideoAspect, VideoFill } from "./VideoFill";

type MediaItemProps = {
  media: Media;
  caption?: ReactNode;
  priority?: boolean;
  zoomable?: boolean;
  sizes?: string;
};

export function MediaItem({
  media,
  caption,
  priority = false,
  zoomable = false,
  sizes = "(max-width: 900px) 100vw, 70vw",
}: MediaItemProps) {
  const video = useVideoAspect(media);
  const aspect = media.kind === "video" ? video.aspect : aspectOf(media);

  return (
    <figure
      className={zoomable ? "media-item media-zoomable" : "media-item"}
      style={{ "--aspect": aspect } as CSSProperties}
    >
      <div className="media-frame">
        {media.kind === "video" ? (
          <VideoFill media={media} onLoadedMetadata={video.onLoadedMetadata} />
        ) : (
          <Image
            className="media-fill"
            src={media.src}
            alt={media.alt}
            fill
            sizes={sizes}
            priority={priority}
          />
        )}
      </div>
      {caption ? (
        <figcaption className="caption media-caption">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
