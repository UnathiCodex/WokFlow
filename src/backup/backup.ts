/**
 * ## Backup
 *
 * Writes backup files of the open database.
 *
 * - `node:fs`: Works with files and folders on the disk.
 * - `node:path`: Builds file paths for the operating system.
 */

import { mkdirSync } from "node:fs";
import { join } from "node:path";

import type { DatabaseSync } from "node:sqlite";


/**
 * Writes a consistent copy of the open database into a new file, named after the time in UTC
 * (`wokflow-2026-09-22T18-30.db`), without colons as Windows does not allow them in file names.
 * - {@link mkdirSync}: Creates the folder with its parent folders when missing.
 * - {@link join}: Builds the path of the file.
 * - `VACUUM INTO`: Copies the whole database into the file while the database stays in use.
 *
 * @param database - Open database
 * @param folder - Folder for the backup files
 * @param time - Time of the backup
 * @returns Path of the backup file
 * @throws {Error} - When a backup of the same minute exists already
 */
export function backupWrite(database: DatabaseSync, folder: string, time: Date): string {
    const name: string = time.toISOString().slice(0, 16).replace(":", "-");
    const file: string = join(folder, `wokflow-${name}.db`);

    mkdirSync(folder, { recursive: true });
    database.prepare("VACUUM INTO ?").run(file);
    return file;
}
