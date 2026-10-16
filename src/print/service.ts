/**
 * ## Print service
 *
 * Prints the jobs of the print queue one after the other.
 *
 * - `./queue.ts`: Stores the print jobs until they are printed.
 */

import { jobNext, jobPrinted, jobFailed } from "./queue.ts";
import type { DatabaseSync } from "node:sqlite";
import type { Job } from "./queue.ts";


/**
 * Prints the oldest unprinted {@link Job}.
 * Tries once, the waiting between two tries is the interval of the caller.
 * A failed job stays the next one, so a ticket is never skipped.
 *
 * - {@link jobNext}: Reads the oldest unprinted job.
 * - `send`: Sends the bytes of the job to the printer, e.g. `printerSend` with host and port.
 * - {@link jobPrinted}: Marks the job as printed.
 * - {@link jobFailed}: Counts the failed try and keeps its error as log.
 * - {@link console.error}: Logs the failed try with time and job.
 *
 * @param database - Open database
 * @param send - Sends the bytes to the printer
 * @returns `true` when a job was printed, `false` when it failed or the queue is empty
 */
export async function printNext(database: DatabaseSync,
                                send: (bytes: Uint8Array) => Promise<void>): Promise<boolean> {

    const job: Job | null = jobNext(database);
    if (job === null) return false;

    try {
        await send(job.bytes);
    } catch (error: unknown) {
        const text: string = (error as Error).message;
        console.error(new Date().toISOString(), "Print job", job.id, "failed:", text);
        jobFailed(database, job.id, text);
        return false;
    }
    jobPrinted(database, job.id);
    return true;
}
