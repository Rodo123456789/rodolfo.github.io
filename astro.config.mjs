// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://rodo123456789.github.io',
  base: '/rodolfo.github.io/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});
