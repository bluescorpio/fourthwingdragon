import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  site: 'https://fourthwingdragon.com',
  output: 'static',
  build: { format: 'directory' },
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/draft/') && !page.includes('/xaden-riorson/') }),
    mdx(),
  ],
  vite: { plugins: [tailwindcss()] },
});
