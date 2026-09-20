/**
 * ## Page
 *
 * Gives out the files of the page, as Vite builds them.
 *
 * - `node:fs`: Works with files and folders on the disk.
 * - `node:path`: Builds file paths for the operating system.
 */

import { existsSync, readFileSync } from "node:fs";
import { join, extname, relative } from "node:path";
import type { ServerResponse } from "node:http";


/**
 * Folder of the built page, `dist`.
 * - {@link join}: Joins path parts to one path, resolves each `..`.
 *   - `import.meta.dirname`: Folder of this file, `src/server`.
 *   - `../../dist`: Two folders up, then into `dist`.
 */
export const pageFolder: string = join(import.meta.dirname, "../../dist");

/**
 * Content types of the page files by their ending.
 * Every answer is sent as plain characters,
 * so the answer has to name its type.
 */
const contentTypes: { [ending: string]: string } = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".map": "application/json; charset=utf-8",
    ".svg": "image/svg+xml",
    ".ttf": "font/ttf",
};

/**
 * Sends the file that lies at the path in the page folder.
 * - {@link join}: Joins page folder and path to file path,
 *   path `/` is `index.html`.
 * - {@link relative}: Resolves way from page folder to file,
 *   but starts with `..` if file lies outside.
 * - {@link existsSync}: Checks if file exists on disk.
 *
 * @param response - Answer to the phone
 * @param path - Path of the url
 */
export function pageSend(response: ServerResponse, path: string): void {
    const file: string = join(pageFolder, path === "/" ? "index.html" : path);
    if (relative(pageFolder, file).startsWith("..") || !existsSync(file)) {
        response.statusCode = 404;
        response.end();
    } else {
        response.setHeader("Content-Type", contentTypes[extname(file)]);
        response.setHeader("Cache-Control", "no-store"); // phone should not keep the file
        response.end(readFileSync(file));
    }
}
