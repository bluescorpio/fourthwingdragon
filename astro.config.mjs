import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({site:'https://fourthwingdragon.com',output:'static',build:{format:'directory'},integrations:[sitemap(),mdx()],vite:{plugins:[tailwindcss()]}});
