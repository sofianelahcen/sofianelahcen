import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";
import { aspectOf, type Media } from "@/lib/media";

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
  return (
    <figure
      className={zoomable ? "media-item media-zoomable" : "media-item"}
      style={{ "--aspect": aspectOf(media) } as CSSProperties}
    >
      <div className="media-frame">
        {media.kind === "video" ? (
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
          />
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
