/**
 * ## Ticket bytes test
 *
 * Checks the printer bytes of the order ticket.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:buffer`: Holds and joins bytes.
 */

import { test } from "node:test";
import { deepEqual, ok } from "node:assert/strict";
import { Buffer } from "node:buffer";
import { ticketBytesOf } from "../src/print/ticketBytes.ts";
import {
    escposInitialize,
    escposCodepage,
    escposText,
    escposLine,
    escposCut,
} from "../src/printer/escpos.ts";


test(
    "A ticket is reset, code page, every line, three empty lines and cut, umlauts in PC858",
    (): void => {
        deepEqual(ticketBytesOf(["Tisch 14", "1 Bier"]), Buffer.concat([
            escposInitialize,
            escposCodepage,
            escposText("Tisch 14"),
            escposLine,
            escposText("1 Bier"),
            escposLine,
            escposLine,
            escposLine,
            escposLine,
            escposCut,
        ]));
        ok(ticketBytesOf(["1 Grüner Salat"]).includes(0x81));
    }
);
