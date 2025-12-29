import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://rodo123456789.github.io/',

  integrations: [react()],

  vite: {
    plugins: [tailwindcss()]
  }
});
