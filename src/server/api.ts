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
 * - `../tables/locks.ts`: Locks a table for one device.
 */

import { createServer } from "node:http";
import { json } from "node:stream/consumers";
import { menu } from "../catalog/menu.ts";
import * as orders from "../tables/orders.ts";
import { tableLock, tableUnlock } from "../tables/locks.ts";

import type { IncomingMessage, ServerResponse, Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";


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
 * Sends an answer to the phone.
 * - `statusCode`: Sets status number in the first line of the answer.
 * - `Content-Type`: Tells phone that the body is JSON text in UTF-8.
 * - `Cache-Control`: Tells phone with `no-store` to not keep the answer.
 * - {@link JSON.stringify}: Writes `body` down as JSON text.
 * - `end`: Sends the body and finishes the answer.
 *
 * An HTTP-answer as the server sends it:
 *
 * ```
 * HTTP/1.1 404 Not Found
 * Content-Type: application/json; charset=utf-8
 * Cache-Control: no-store
 *
 * {"error":"No such address"}
 * ```
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

/**
 * Handles a request by its method and its address.
 * - `GET /api/menu`: Sends menu.
 * - `GET /api/tables/:table/orders`: Sends open orders of table.
 * - `POST /api/tables/:table/orders`: Adds/removes orders of table.
 * - `POST /api/tables/:table/lock`: Locks table for device in body.
 * - `DELETE /api/tables/:table/lock`: Unlocks table for device in body.
 *
 * A HTTP-request from as the phone sends with headers:
 *
 * ```
 * GET /api/menu HTTP/1.1
 * Host: localhost:3000
 * Connection: keep-alive
 * ```
 * - `address`: Path of the url, without protocol, host, port.
 * - `match`: Match of the path with its groups in `()`, else `null`.
 * - `tableId`: Tableid from the path, highlighted by `()`.
 * - `tableResource`: `orders` or `lock` from the path, highlighted by `()`.
 * - An unknown address gets status `404`.
 *
 * @param database - Open database
 * @param request - Request from the phone
 * @param response - Answer to the phone
 * @throws {unknown} - Error of the chosen answer thrown again
 */
async function requestHandle(database: DatabaseSync,
                             request: IncomingMessage,
                             response: ServerResponse): Promise<void> {

    const address: string = request.url ?? "";
    const match: RegExpMatchArray | null = // path /api/tables/:table/orders|lock
        address.match(new RegExp("^/api/tables/([A-Z0-9]+)/(orders|lock)$"));

    const tableId: string = match?.[1] ?? "";
    const tableResource: string = match?.[2] ?? "";

    if (request.method === "GET" && address === "/api/menu") {
        responseSend(response, 200, menu);

    } else if (request.method === "GET" && tableResource === "orders") {
        responseSend(response, 200, orders.ordersRead(database, tableId));

    } else if (request.method === "POST" && tableResource === "orders") {
        orders.ordersUpdate(database, tableId, await json(request) as orders.OrdersUpdate);
        responseSend(response, 200, null);

    } else if (request.method === "POST" && tableResource === "lock") {
        responseSend(response, 200, tableLock(tableId, await json(request) as string));

    } else if (request.method === "DELETE" && tableResource === "lock") {
        tableUnlock(tableId, await json(request) as string);
        responseSend(response, 200, null);

    } else {
        responseSend(response, 404, { error: "No such address" });
    }
}
