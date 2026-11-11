import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://www.innoviq.de",
  output: "static",
  integrations: [tailwind({ applyBaseStyles: false }), sitemap()],
});
