import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { UNPUBLISHED_PATHS } from './src/data/unpublished.ts';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  site: 'https://fourthwingdragon.com',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => !UNPUBLISHED_PATHS.includes(new URL(page).pathname) }),
    mdx(),
  ],
  vite: { plugins: [tailwindcss()] },
});
