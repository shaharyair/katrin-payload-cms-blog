import type { Block } from "payload";

export const HtmlBlock: Block = {
  slug: "htmlBlock",
  interfaceName: "HtmlBlock",
  fields: [
    {
      name: "html",
      type: "text",
      label: "HTML",
      required: true,
    },
  ],
  labels: {
    plural: "HTML Blocks",
    singular: "HTML Block",
  },
};
