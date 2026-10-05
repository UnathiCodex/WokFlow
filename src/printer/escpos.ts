/**
 * ## ESC/POS
 *
 * Builds the bytes that the printer Metapace T-3II prints.
 * Text goes to the printer as it is, commands start with the control byte ESC.
 *
 * ```
 * command = ESC (0x1B) + letter + optional parameters
 * ```
 */

import { Buffer } from "node:buffer";

/**
 * Resets the printer to its default settings, comes first on every ticket.
 */
export const escposInitialize: Buffer = Buffer.from([0x1b, 0x40]); // ESC @

/**
 * Selects code page PC858, which holds German umlauts and the euro sign.
 */
export const escposCodepage: Buffer = Buffer.from([0x1b, 0x74, 19]); // ESC t 19

/**
 * Bytes of German special characters in code page PC858.
 */
const escposPc858: Record<string, number> = {
    "ä": 0x84,
    "ö": 0x94,
    "ü": 0x81,
    "Ä": 0x8e,
    "Ö": 0x99,
    "Ü": 0x9a,
    "ß": 0xe1,
    "€": 0xd5,
};

/**
 * Turns text into bytes of code page PC858, unknown characters become "?".
 *
 * @param text - Text to print, like "Cola 0,5"
 * @returns Bytes of the text
 */
export function escposText(text: string): Buffer {
    const bytes: number[] = [];
    for (const character of text) {
        const code: number = character.charCodeAt(0);
        bytes.push(escposPc858[character] ?? (code < 128 ? code : 0x3f)); // 0x3f is "?"
    }
    return Buffer.from(bytes);
}

/**
 * Ends the current line and moves the paper up by one line.
 */
export const escposLine: Buffer = Buffer.from([0x0a]); // LF

/**
 * Feeds the paper past the cutter and cuts it, leaving a small connection.
 */
export const escposCut: Buffer = Buffer.from([0x1d, 0x56, 0x42, 0x03]); // GS V 66 3