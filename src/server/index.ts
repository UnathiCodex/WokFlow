/**
 * ## WokFlow server
 *
 * Start with `npm start`.
 *
 * {@link serverCreate} creates the server that waits at `localhost:3000`
 * and answers each request with page file, menu, orders of a table.
 *
 * - `./database.ts`: Manages the local SQLite database connection.
 * - `./api.ts`: Connects browser requests to the server.
 * - `./config.ts`: Holds the address of the printer.
 * - `../tables/orderbook.ts`: Creates the database table of the orders.
 * - `../print/queue.ts`: Creates the database table of the print jobs.
 * - `../tables/payments.ts`: Creates the database table of the payments.
 * - `../print/service.ts`: Prints the oldest job of the print queue.
 * - `../print/transport.ts`: Sends the bytes of a ticket to the printer over the network.
 */

import { databaseOpen } from "./database.ts";
import { serverCreate } from "./api.ts";
import { printerHost, printerPort } from "./config.ts";
import { orderbookCreate } from "../tables/orderbook.ts";
import { queueCreate } from "../print/queue.ts";
import { paymentsCreate } from "../tables/payments.ts";
import { printNext } from "../print/service.ts";
import { printerSend } from "../print/transport.ts";

import type { Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";


const database: DatabaseSync = databaseOpen();
orderbookCreate(database);
queueCreate(database);
paymentsCreate(database);
const server: Server = serverCreate(database);
server.listen(3000, (): void => console.log("http://localhost:3000"));
setInterval((): void => {
    printNext(
        database,
        (bytes: Uint8Array): Promise<void> => printerSend(printerHost, printerPort, bytes),
    ).catch((error: unknown): void => console.error(new Date().toISOString(), error));
}, 6000); // longer than printerTimeout, so two tries never overlap
