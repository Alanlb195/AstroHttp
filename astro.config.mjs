// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// import cloudflare from '@astrojs/cloudflare';

import db from '@astrojs/db';

import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  site: 'https://example.com',
  output: "static",

  // adapter: cloudflare({
  //   imageService: 'cloudflare',
  // }),
  integrations: [mdx(), sitemap(), db()],
  security: {
    checkOrigin: false
  },

  adapter: vercel()
});