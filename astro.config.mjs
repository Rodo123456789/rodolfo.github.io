// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Rodo123456789.github.io/rodolfo.github.io',
  base: '/',
  vite: {
    plugins: [tailwindcss()]
  }
});