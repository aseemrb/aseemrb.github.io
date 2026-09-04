import { defineConfig, envField } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import remarkToc from "remark-toc";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkCollapse from "remark-collapse";
import {
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerFileName } from "./src/utils/transformers/fileName";
import { SITE } from "./src/config";
import { flightsDataPlugin } from "./scripts/flights/flightsDataPlugin.mjs";
import { devApiPlugin } from "./scripts/flights/devApiPlugin.mjs";

// https://astro.build/config
export default defineConfig({
  // site: SITE.website,
  site: 'https://aseemrb.me',
  integrations: [
    react(),
    sitemap({
      // /logbook stays out of the sitemap while its nav entry is hidden, so
      // the page is reachable by URL but not advertised.
      filter: page =>
        (SITE.showArchives || !page.endsWith("/archives")) &&
        !page.endsWith("/logbook/"),
    }),
  ],
  // Keep HTML-aware whitespace compression; the v7 "jsx" default strips
  // newline whitespace between inline elements, which joins words around
  // links in hand-written prose.
  compressHTML: true,
  markdown: {
    // Astro 7 renders Markdown with its native pipeline by default; the
    // unified processor keeps the remark/rehype plugins below working.
    processor: unified(),
    remarkPlugins: [
      remarkMath,
      remarkToc,
      [remarkCollapse, { test: "Table of contents" }]
    ],
    rehypePlugins: [rehypeKatex],
    shikiConfig: {
      // For more themes, visit https://shiki.style/themes
      themes: { light: "min-light", dark: "night-owl" },
      defaultColor: false,
      wrap: false,
      transformers: [
        transformerFileName({ style: "v2", hideDot: false }),
        transformerNotationHighlight(),
        transformerNotationWordHighlight(),
        transformerNotationDiff({ matchAlgorithm: "v3" }),
      ],
    },
  },
  vite: {
    // The flight log plugins keep public/logbook/data in step with its KML
    // tracks, and (dev only) serve the add/delete API behind the logbook
    // editor; see scripts/flights/.
    plugins: [tailwindcss(), flightsDataPlugin(), devApiPlugin()],
    optimizeDeps: {
      exclude: ["@resvg/resvg-js"],
    },
  },
  image: {
    responsiveStyles: true,
    layout: "constrained",
  },
  env: {
    schema: {
      PUBLIC_GOOGLE_SITE_VERIFICATION: envField.string({
        access: "public",
        context: "client",
        optional: true,
      }),
    },
  },
});
