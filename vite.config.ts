/**
 * ## Vite configuration
 *
 * Settings of Vite, which builds the page for the WokFlow server.
 * Build with `npm run build`.
 *
 * - `vite`: Translates TypeScript of the page for the browser.
 * - `root`: Folder of the page.
 * - `outDir`: Folder of the built page relative from `root`.
 * - `emptyOutDir`: Empties `outDir` before each build, also outside of `root`.
 * - `sourcemap`: Lets the browser show the TypeScript,
 *   not the built code.
 */

import { defineConfig } from "vite";


export default defineConfig({
    root: "src/page",
    build: {
        outDir: "../../dist",
        emptyOutDir: true,
        sourcemap: true,
    },
});
