/**
 * ## Printer transport
 *
 * Sends the bytes of a ticket to the printer over the network.
 *
 * - `node:net`: Opens TCP connections and creates TCP servers.
 */

import { createConnection } from "node:net";

import type { Socket } from "node:net";


/**
 * Time in milliseconds the connection to the printer may stay silent
 * before {@link printerSend} gives up.
 * A printer that is switched off or unplugged does not refuse the connection,
 * it never answers, and the operating system waits for minutes.
 * The queue must not wait that long, it tries again.
 */
export const printerTimeout: number = 5000;

/**
 * Sends bytes to the printer and waits until the connection is closed.
 * Tries once, the queue does the retries.
 *
 * - {@link createConnection}: Opens a TCP connection to the printer.
 * - `timeout`: Sets the silence of the connection to {@link printerTimeout}.
 * - `destroy`: Closes the connection with an error.
 * - `end`: Sends the bytes, then closes the sending side.
 * - `close`: Tells that the printer has closed its side too.
 *
 * @param host - Address of the printer in the network
 * @param port - TCP port of the printer
 * @param bytes - Bytes of the ticket
 * @throws {Error} - When the connection fails or the printer stays silent for {@link printerTimeout}
 */
export function printerSend(host: string, port: number, bytes: Uint8Array): Promise<void> {
    return new Promise<void>((resolve: () => void, reject: (error: Error) => void): void => {
        const socket: Socket = createConnection({ host, port, timeout: printerTimeout });
        socket.on("timeout", (): void => {
            socket.destroy(new Error(`Printer ${host}:${port} did not answer`));
        });
        socket.on("error", reject);
        socket.on("close", (): void => resolve());
        socket.end(bytes);
    });
}
