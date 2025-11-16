// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: "https://rodo123456789.github.io/",
  base: "/",
  vite: {
    plugins: [tailwindcss()]
  }
});
