import { defineField, defineType } from "sanity";

export const imageItem = defineType({
  name: "imageItem",
  title: "Image",
  type: "object",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Alt text",
      type: "string",
      description:
        "Describes the image for screen readers and when the image cannot load.",
    }),
  ],
  preview: {
    select: { media: "image", alt: "alt" },
    prepare: ({ media, alt }) => ({ title: alt || "Image", media }),
  },
});

export const videoItem = defineType({
  name: "videoItem",
  title: "Video",
  type: "object",
  fields: [
    defineField({
      name: "file",
      title: "Video file",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "poster",
      title: "Poster frame",
      type: "image",
      description:
        "Shown while the video loads. Recommended: it avoids a blank frame, " +
        "and its shape is used to reserve the right space before the video arrives.",
    }),
    defineField({
      name: "alt",
      title: "Description",
      type: "string",
    }),
  ],
  preview: {
    select: { media: "poster", alt: "alt" },
    prepare: ({ media, alt }) => ({ title: alt || "Video", media }),
  },
});
