import type { Media } from "./media";

export type Credit = { role?: string; name: string };

export type Slide = {
  media: Media;
  title?: string;
  credits?: Credit[];
};

export type Project = {
  id: string;
  slides: Slide[];
};

export type ArchiveProject = {
  id: string;
  title: string;
  year: string;
  credits: Credit[];
  items: Media[];
  cover: Media;
};
