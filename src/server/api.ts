/**
 * ## Server API
 *
 * Connects the requests of the phones to the server,
 * where the menu and the saved orders are.
 *
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:stream/consumers`: Reads a whole stream into one value.
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 * - `../tables/orders.ts`: Stores the orders of the tables.
 */

import { createServer } from "node:http";
import { json } from "node:stream/consumers";
import { menu } from "../catalog/menu.ts";
import * as orders from "../tables/orders.ts";

import type { IncomingMessage, ServerResponse, Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";


//#region Server

/**
 * Creates the API server without starting it.
 * - {@link createServer}: Stores the lambda and calls it once per request,
 *   with a fresh `request` and `response` from Node.
 * - {@link requestHandle}: Handles the request by its method and its address.
 * - {@link responseSend}: Sends the answer as JSON text.
 *   Answers an error of requestHandle with status `500` without stopping the server.
 *
 * @param database - Open database
 * @returns {@link Server} ready to listen for requests
 */
export function serverCreate(database: DatabaseSync): Server {
    return createServer((request: IncomingMessage, response: ServerResponse): void => {
        requestHandle(database, request, response).catch((error: unknown): void => {
            console.error(new Date().toISOString(), request.method, request.url, error);
            responseSend(response, 500, { error: "The server failed" });
        });
    });
}

/**
 * Handles a request by its method and its address.
 * - `GET /api/menu`: Sends menu.
 * - `GET /api/tables/:table/orders`: Sends open orders of the table.
 * - `POST /api/tables/:table/orders`: Adds and removes orders of the table.
 *    And sends the open orders of the table.
 *
 * A HTTP-request from as the phone sends with headers:
 *
 * ```
 * GET /api/menu HTTP/1.1
 * Host: localhost:3000
 * Connection: keep-alive
 * ```
 * - An update cannot be read/saved gets status `400` with its reason.
 * - An unknown address gets status `404`.
 *
 * @param database - Open database
 * @param request - Request from the phone
 * @param response - Answer to the phone
 * @throws {unknown} - Error of the chosen answer thrown again
 */
async function requestHandle(database: DatabaseSync, request: IncomingMessage, response: ServerResponse):
    Promise<void> {

    // Path of the url, without protocol, host, port
    const address: string = request.url ?? "";
    // Tableid from the path /api/tables/:table/orders highlighted by ()
    const tableId: string = address.match(new RegExp("^/api/tables/([A-Z0-9]+)/orders$"))?.[1] ?? "";

    if (request.method === "GET" && address === "/api/menu") {
        responseSend(response, 200, menu);

    } else if (request.method === "GET" && tableId !== "") {
        responseSend(response, 200, orders.ordersRead(database, tableId));

    } else if (request.method === "POST" && tableId !== "") {
        try {
            const update: orders.OrdersUpdate = updateRead(await json(request));
            orders.ordersUpdate(database, tableId, update);
        } catch (error: unknown) {
            responseSend(response, 400, { error: (error as Error).message });
            return;
        }
        responseSend(response, 200, orders.ordersRead(database, tableId));

    } else {
        responseSend(response, 404, { error: "No such address" });
    }
}

/**
 * Sends an answer as JSON text in UTF-8.
 *
 * @param response - Answer to the phone
 * @param status - HTTP status code
 * @param body - Data to send
 */
function responseSend(response: ServerResponse, status: number, body: unknown): void {
    response.statusCode = status;
    response.setHeader("Content-Type", "application/json; charset=utf-8");
    response.setHeader("Cache-Control", "no-store");
    response.end(JSON.stringify(body));
}

//#endregion Server


//#region Tables

/**
 * Reads a received value as an object,
 * so its properties can be checked one by one.
 *
 * @param value - Received value
 * @returns Object with unchecked properties
 * @throws {Error} - When the value is no object
 */
function objectRead(value: unknown): { [name: string]: unknown; } {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        throw new Error("An object is needed");
    return value as { [name: string]: unknown; };
}

/**
 * Reads a received value as an {@link orders.OrdersUpdate}.
 *
 * @param value - Received value
 * @returns {@link orders.OrdersUpdate} with checked types
 * @throws {Error} - When one of the two lists is missing
 */
function updateRead(value: unknown): orders.OrdersUpdate {
    const update: { [name: string]: unknown; } = objectRead(value);
    if (!Array.isArray(update.add) || !Array.isArray(update.remove))
        throw new Error("An update needs the lists add and remove");
    return { add: update.add.map(orderNewRead), remove: update.remove.map(orderNewRead) };
}

/**
 * Reads a received value as an {@link orders.OrderNew}.
 * Anything else the phone sent with it is left out.
 *
 * @param value - Received value
 * @returns {@link orders.OrderNew} with checked types
 * @throws {Error} - When a property is missing or wrongly typed
 */
function orderNewRead(value: unknown): orders.OrderNew {
    const order: { [name: string]: unknown; } = objectRead(value);
    if (typeof order.articleId !== "string")
        throw new Error("An order needs its articleId as text");
    if (typeof order.variantId !== "string" && order.variantId !== null)
        throw new Error("An order needs its variantId as text or null");
    if (typeof order.quantity !== "number")
        throw new Error("An order needs its quantity as number");
    return { articleId: order.articleId, variantId: order.variantId, quantity: order.quantity };
}

//#endregion Tables
