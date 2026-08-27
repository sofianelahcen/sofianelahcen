"use client";

import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "./Lightbox";
import { countLabel } from "@/lib/plural";
import type { ArchiveProject } from "@/lib/content";

export function ArchiveGallery({ projects }: { projects: ArchiveProject[] }) {
  const [openId, setOpenId] = useState<string | null>(null);
  const openProject = projects.find((project) => project.id === openId);

  return (
    <>
      <ul className="archive-grid">
        {projects.map((project) => {
          const cover = project.cover;

          return (
            <li key={project.id} className="archive-cell">
              <button
                type="button"
                className="archive-tile"
                aria-label={`${project.title}, ${countLabel(project.items.length, "image")}`}
                onClick={() => setOpenId(project.id)}
              >
                <span className="archive-frame">
                  {cover.kind === "video" ? (
                    <video
                      className="media-fill"
                      src={cover.src}
                      poster={cover.poster}
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      aria-hidden
                    />
                  ) : (
                    <Image
                      className="media-fill"
                      src={cover.src}
                      alt=""
                      fill
                      sizes="(max-aspect-ratio: 4/5) 100vw, 20vw"
                    />
                  )}
                </span>
                <span className="caption archive-label">
                  <span className="archive-name">{project.title}</span>
                  <span className="archive-meta">
                    {project.year}
                    <span className="archive-count">
                      {project.items.length}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {openProject ? (
        <Lightbox
          key={openProject.id}
          title={openProject.title}
          year={openProject.year}
          credits={openProject.credits}
          items={openProject.items}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </>
  );
}
