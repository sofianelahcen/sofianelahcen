import { sanityClient } from "./sanity/client";
import { siteQuery } from "./sanity/queries";
import type { Media } from "./media";
import type { ArchiveProject, Credit, Slide } from "./content";

const FULL_WIDTH = 2000;
const THUMB_WIDTH = 800;

type RawMedia = {
  _type: "imageItem" | "videoItem";
  _key: string;
  alt?: string | null;
  url: string;
  posterUrl?: string | null;
  width: number;
  height: number;
};

type RawProject = {
  _id: string;
  title: string;
  year?: string | null;
  credits?: string[] | null;
  media?: RawMedia[] | null;
};

type RawSettings = {
  title?: string | null;
  tagline?: string | null;
  sectionLabel?: string | null;
  statement?: string | null;
  email?: string | null;
  instagram?: string | null;
};

const sized = (url: string, width: number) =>
  `${url}?w=${width}&q=80&auto=format`;

const toMedia = (
  raw: RawMedia,
  width = FULL_WIDTH,
  fallbackAlt = "",
): Media => ({
  src: raw._type === "videoItem" ? raw.url : sized(raw.url, width),
  width: raw.width,
  height: raw.height,
  kind: raw._type === "videoItem" ? "video" : "image",
  ...(raw.posterUrl ? { poster: sized(raw.posterUrl, width) } : {}),
  alt: raw.alt?.trim() || fallbackAlt,
});

const describe = (project: RawProject, index: number) =>
  index === 0 ? project.title : `${project.title} — ${index + 1}`;

const toCredits = (lines?: string[] | null): Credit[] =>
  (lines ?? []).map((name) => ({ name }));

const toSlides = (project: RawProject): Slide[] => {
  const credits = toCredits(project.credits);
  return (project.media ?? []).map((raw, index) => ({
    media: toMedia(raw, FULL_WIDTH, describe(project, index)),
    ...(index === 0
      ? { title: project.title, credits: credits.length ? credits : undefined }
      : {}),
  }));
};

export type SiteContent = {
  nav: {
    title: string;
    tagline: string;
    section: string;
    contact: string;
    archive: string;
  };
  profile: { statement: string; email: string; instagram: string };
  works: { id: string; slides: Slide[] }[];
  archive: ArchiveProject[];
};

export async function getSiteContent(): Promise<SiteContent> {
  const data = await sanityClient.fetch<{
    settings: RawSettings | null;
    projects: RawProject[] | null;
    archive: RawProject[] | null;
  }>(siteQuery);

  const settings = data.settings ?? {};

  return {
    nav: {
      title: settings.title ?? "SOFIANE LAHCEN",
      tagline: settings.tagline ?? "ART DIRECTION & IMAGE MAKING",
      section: settings.sectionLabel ?? "SELECTED WORKS",
      contact: "CONTACT",
      archive: "ARCHIVE",
    },
    profile: {
      statement: settings.statement ?? "",
      email: settings.email ?? "",
      instagram: settings.instagram ?? "",
    },
    works: (data.projects ?? [])
      .filter((project) => (project.media ?? []).length > 0)
      .map((project, index) => ({
        id: index === 0 ? "project-001" : `project-${String(index + 1).padStart(3, "0")}`,
        slides: toSlides(project),
      })),
    archive: (data.archive ?? [])
      .filter((project) => (project.media ?? []).length > 0)
      .map((project) => ({
        id: project._id,
        title: project.title,
        year: project.year ?? "",
        credits: toCredits(project.credits),
        items: (project.media ?? []).map((raw, index) =>
          toMedia(raw, FULL_WIDTH, describe(project, index)),
        ),
        cover: toMedia((project.media ?? [])[0], THUMB_WIDTH, project.title),
      })),
  };
}
