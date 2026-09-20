/**
 * ## Test setup
 *
 * Prepares database, test server, dummy page, orders for tests.
 *
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `node:events`: Waits for an event of an object.
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:fs`: Works with files and folders on the disk.
 * - `node:path`: Builds file paths for the operating system.
 */

import { DatabaseSync } from "node:sqlite";
import { once } from "node:events";
import { request } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { orderbookCreate } from "../src/tables/orderbook.ts";
import { orderOf } from "../src/tables/orders.ts";
import { serverCreate } from "../src/server/api.ts";
import { pageFolder } from "../src/server/page.ts";

import type { Server, ClientRequest, IncomingMessage } from "node:http";
import type { AddressInfo } from "node:net";
import type { Order } from "../src/tables/orders.ts";


/**
 * Opens an empty database in memory with the `orderbook`.
 *
 * @returns {@link DatabaseSync} connection object
 */
export function databaseTest(): DatabaseSync {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    orderbookCreate(database);
    return database;
}

export let database: DatabaseSync;
export let url: string;
let server: Server;

/**
 * Starts fresh test server with fresh database on free port.
 */
export async function serverStart(): Promise<void> {
    database = databaseTest();
    server = serverCreate(database).listen(0, "127.0.0.1");
    await once(server, "listening");
    url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
}

/**
 * Closes test server, otherwise test file never ends.
 */
export function serverStop(): void {
    server.close();
}

const pageDummy: string = "<title>Test page</title>";

/**
 * Creates dummy page for tests, only if no page is built.
 */
export function pageDummyCreate(): void {
    mkdirSync(pageFolder, { recursive: true });
    if (!existsSync(join(pageFolder, "index.html")))
        writeFileSync(join(pageFolder, "index.html"), pageDummy);
}

/**
 * Removes dummy page, a built page stays.
 */
export function pageDummyRemove(): void {
    if (readFileSync(join(pageFolder, "index.html"), "utf8") === pageDummy)
        rmSync(join(pageFolder, "index.html"));
}

/**
 * Sends an update of a table to the test server with
 * - {@link fetch}: Sends an HTTP request.
 * - {@link RequestInit.method}: HTTP method as string.
 *   Common values: `GET` (default), `POST`, `PUT`, `PATCH`,
 *   `DELETE`, `HEAD`, `OPTIONS`.
 * - {@link RequestInit.body}: Data to send, here JSON text from
 *   {@link JSON.stringify}. Omitted for `GET` and `HEAD`.
 *
 * @param tableId - Table identifier
 * @param update - Value to send as JSON
 * @returns Answer of the server
 */
export function updateSend(tableId: string, update: unknown): Promise<Response> {
    return fetch(`${url}/tables/${tableId}/orders`, {
        method: "POST",
        body: JSON.stringify(update),
    });
}

/**
 * Sends a lock or an unlock of a table to the test server.
 *
 * @param method - `POST` locks, `DELETE` unlocks
 * @param tableId - Table identifier
 * @param deviceId - Device identifier
 * @returns `true` or `false` for a lock, `null` for an unlock
 */
export async function lockSend(method: string, tableId: string,
                               deviceId: string): Promise<boolean | null> {
    const response: Response = await fetch(`${url}/tables/${tableId}/lock`, {
        method, // POST or DELETE
        body: JSON.stringify(deviceId),
    });
    return response.json();
}

/**
 * Sends a `GET` with a path exactly as client has written it,
 * because {@link fetch} resolves each `..` before it sends
 * and everything that would go above `/` is dropped automatically.
 *
 * @param path - Path of the url
 * @returns Status of the answer
 */
export async function pathSend(path: string): Promise<number | undefined> {
    const requestRaw: ClientRequest = request(url, { path }).end();
    const answers: IncomingMessage[] = await once(requestRaw, "response");
    return answers[0].resume().statusCode; // resume() lets unread body flow away of memory
}

export const colaSmall1: Order = orderOf({ articleId: "Cola", variantId: "0.25", quantity: 1 });
export const colaBig1: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 1 });
export const colaBig2: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 2 });
export const colaBig3: Order = orderOf({ articleId: "Cola", variantId: "0.5", quantity: 3 });
export const redBull0: Order = orderOf({ articleId: "Red Bull", variantId: null, quantity: 0 });
export const redBull1: Order = orderOf({ articleId: "Red Bull", variantId: null, quantity: 1 });
