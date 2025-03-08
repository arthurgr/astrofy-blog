import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from "@astrojs/tailwind";

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.arthur-revelski.com/',
  integrations: [mdx(), sitemap(), tailwind()],
  output: 'server',
  adapter: vercel()
});