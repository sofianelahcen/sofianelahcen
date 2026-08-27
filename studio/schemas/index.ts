import { imageItem, videoItem } from "./mediaItem";
import { archiveProject, project } from "./project";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  siteSettings,
  project,
  archiveProject,
  imageItem,
  videoItem,
];
