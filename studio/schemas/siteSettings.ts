import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  groups: [
    { name: "nav", title: "Navigation", default: true },
    { name: "info", title: "Info" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Name",
      type: "string",
      group: "nav",
      description: "First line of the header.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      group: "nav",
      description: "Second line of the header.",
    }),
    defineField({
      name: "sectionLabel",
      title: "Section label",
      type: "string",
      group: "nav",
      description: 'Sits under the header on desktop. Currently "SELECTED WORKS".',
    }),
    defineField({
      name: "statement",
      title: "Info text",
      type: "text",
      rows: 6,
      group: "info",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "info",
      description: 'Shown as the "CONTACT" link.',
      validation: (rule) =>
        rule.regex(/^[^@\s]+@[^@\s]+\.[^@\s]+$/, { name: "email" }),
    }),
    defineField({
      name: "instagram",
      title: "Instagram URL",
      type: "url",
      group: "info",
      description: 'Shown as the "INSTAGRAM" link.',
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
