/**
 * ## Ticket bytes
 *
 * Turns the lines of the order ticket into the bytes that the printer prints.
 *
 * - `node:buffer`: Holds and joins bytes.
 * - `../printer/escpos.ts`: Builds the bytes of the printer commands and the text.
 */

import { Buffer } from "node:buffer";
import {
    escposInitialize,
    escposCodepage,
    escposText,
    escposLine,
    escposCut,
} from "../printer/escpos.ts";

/**
 * Builds the bytes of one order ticket, from the reset of the printer to the cut.
 * Leaves three empty lines after the last text line, before the cut.
 *
 * - {@link escposText}: Turns a line into bytes of code page PC858.
 * - {@link Buffer.concat}: Joins the bytes of the commands and lines into one buffer.
 *
 * @param lines - Lines of the ticket, as {@link ticketOf} writes them
 * @returns Bytes to send to the printer
 */
export function ticketBytesOf(lines: string[]): Buffer {
    return Buffer.concat([
        escposInitialize,
        escposCodepage,
        ...lines.flatMap((line: string): Buffer[] => [escposText(line), escposLine]),
        escposLine,
        escposLine,
        escposLine,
        escposCut,
    ]);
}
