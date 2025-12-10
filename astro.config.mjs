// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

export default defineConfig({
  site: 'https://Rodo123456789.github.io/rodolfo.github.io',
  base: '/',

  vite: {
    plugins: [tailwindcss()]
  },

  integrations: [react()]
});