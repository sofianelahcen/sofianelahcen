import { defineArrayMember, defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";
import { BatchImageInput } from "../components/BatchImageInput";

const mediaField = defineField({
  name: "media",
  title: "Images and video",
  type: "array",
  of: [
    defineArrayMember({ type: "imageItem" }),
    defineArrayMember({ type: "videoItem" }),
  ],
  options: { layout: "grid" },
  components: { input: BatchImageInput },
  validation: (rule) => rule.min(1),
});

const creditsField = defineField({
  name: "credits",
  title: "Credits",
  type: "array",
  of: [defineArrayMember({ type: "string" })],
  description:
    "One line per credit. Drag to reorder. Shown under the images exactly as written.",
});

export const project = defineType({
  name: "project",
  title: "Selected work",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "project" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    creditsField,
    mediaField,
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "media.0.image",
      poster: "media.0.poster",
      count: "media",
    },
    prepare: ({ title, year, media, poster, count }) => ({
      title,
      subtitle: [year, `${Array.isArray(count) ? count.length : 0} items`]
        .filter(Boolean)
        .join(" · "),
      media: media || poster,
    }),
  },
});

export const archiveProject = defineType({
  name: "archiveProject",
  title: "Archive project",
  type: "document",
  orderings: [orderRankOrdering],
  fields: [
    orderRankField({ type: "archiveProject" }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "string",
    }),
    creditsField,
    mediaField,
  ],
  preview: {
    select: {
      title: "title",
      year: "year",
      media: "media.0.image",
      poster: "media.0.poster",
      count: "media",
    },
    prepare: ({ title, year, media, poster, count }) => ({
      title,
      subtitle: [year, `${Array.isArray(count) ? count.length : 0} items`]
        .filter(Boolean)
        .join(" · "),
      media: media || poster,
    }),
  },
});
