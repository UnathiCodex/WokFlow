/**
 * ## Vite configuration
 *
 * This config file found and build with `npm run build`.
 *
 * Settings of Vite, which builds the page for the WokFlow server.
 *
 * - `vite`: Translates TypeScript of the page for the browser.
 * - `root`: Folder of the page.
 * - `outDir`: Folder of the built page relative from `root`.
 * - `emptyOutDir`: Empties `outDir` before each build.
 *   This has to be set explicitly because our `outDir` is outside of `root`.
 * - `sourcemap`: Writes map file next to built code.
 *   Mapping from each token of built code to its position in original ts file,
 *   such that browser shows errors at their line in ts.
 */

import { defineConfig } from "vite";

// export such that vite can read the config
// default export, such that vite imports it under fixed name
export default defineConfig({
    root: "src/page",
    build: {
        outDir: "../../dist",
        emptyOutDir: true,
        sourcemap: true,
    },
});
