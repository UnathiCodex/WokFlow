/**
 * ## Transport test
 *
 * Checks the sending of bytes against a test printer on the own computer.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:buffer`: Holds and joins bytes.
 * - `node:events`: Waits for an event of an object.
 * - `node:net`: Opens TCP connections and creates TCP servers.
 */

import { test, beforeEach, afterEach } from "node:test";
import { deepEqual, rejects } from "node:assert/strict";
import { Buffer } from "node:buffer";
import { once } from "node:events";
import { createServer } from "node:net";
import { printerSend } from "../src/print/transport.ts";

import type { Server, Socket, AddressInfo } from "node:net";


let printer: Server;
let port: number;
let received: Buffer[];

// Fresh test printer on a free port before each test
beforeEach(async (): Promise<void> => {
    received = [];
    printer = createServer((socket: Socket): void => {
        socket.on("data", (chunk: Buffer): void => { received.push(chunk); });
    }).listen(0, "127.0.0.1");
    await once(printer, "listening");
    port = (printer.address() as AddressInfo).port;
});

// Test printer closed after each test, otherwise the test file never ends
afterEach((): void => { printer.close(); });


/**
 * Reset of the printer, an umlaut of code page PC858 and a line feed.
 */
const bytes: Uint8Array = new Uint8Array([0x1b, 0x40, 0x84, 0x0a]);

test(
    "The bytes arrive at the printer",
    async (): Promise<void> => {
        await printerSend("127.0.0.1", port, bytes);
        deepEqual(Buffer.concat(received), Buffer.from(bytes));
    }
);

test(
    "A printer that does not answer fails",
    async (): Promise<void> => {
        printer.close();
        await rejects(printerSend("127.0.0.1", port, bytes), /ECONNREFUSED/);
    }
);
