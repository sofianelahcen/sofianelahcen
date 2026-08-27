import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { schemaTypes } from "./schemas";

const SINGLETON = "siteSettings";

export default defineConfig({
  name: "default",
  title: "Sofiane Lahcen",
  projectId: "p6dw26nk",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S, context) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site settings")
              .id(SINGLETON)
              .child(
                S.document().schemaType(SINGLETON).documentId(SINGLETON),
              ),
            S.divider(),
            orderableDocumentListDeskItem({
              type: "project",
              title: "Selected works",
              S,
              context,
            }),
            orderableDocumentListDeskItem({
              type: "archiveProject",
              title: "Archive",
              S,
              context,
            }),
          ]),
    }),
    media(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => schemaType !== SINGLETON),
  },

  document: {
    actions: (input, { schemaType }) =>
      schemaType === SINGLETON
        ? input.filter(({ action }) => action !== "unpublish" && action !== "duplicate" && action !== "delete")
        : input,
  },
});
