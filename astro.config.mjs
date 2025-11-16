// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://rodolfo.github.io/",
  base: "/", // ✔ correcto porque es un repositorio tipo "usuario.github.io"
  vite: {
    plugins: [tailwindcss()]
  }
});