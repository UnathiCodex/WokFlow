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
 * - `../tables/payments.ts`: Stores the payments of the tables.
 * - `../ticket/ticket.ts`: Writes the text of the order ticket.
 * - `../print/ticketBytes.ts`: Turns the lines of the ticket into the bytes of the printer.
 * - `../print/queue.ts`: Stores the print jobs until they are printed.
 * - `../closing/turnover.ts`: Sums up the turnover of the paid portions.
 * - `./page.ts`: Gives out the files of the page.
 */

import { createServer } from "node:http";
import { json } from "node:stream/consumers";
import { menu } from "../catalog/menu.ts";
import * as orders from "../tables/orders.ts";
import { tableLock, tableUnlock } from "../tables/locks.ts";
import { paymentsOf } from "../tables/payments.ts";
import { ticketOf } from "../ticket/ticket.ts";
import { ticketBytesOf } from "../print/ticketBytes.ts";
import { jobAdd } from "../print/queue.ts";
import { turnoverOf } from "../closing/turnover.ts";
import { pageSend } from "./page.ts";

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
 * An HTTP-answer example as the server sends it:
 *
 * ```
 * HTTP/1.1 200 OK
 * Content-Type: application/json; charset=utf-8
 * Cache-Control: no-store
 *
 * <JSON text of body>
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
 * Finds the day of a moment on the clock of the restaurant, from midnight to the next midnight.
 * A day lasts 23 or 25 hours when the clock changes, so the end is not 24 hours after the start.
 * - {@link Intl.DateTimeFormat}: Writes the moment as a date, with these options:
 *   - `"en-CA"`: Gives `YYYY-MM-DD`.
 *   - `timeZone`: `Europe/Vienna` reads the clock of the restaurant,
 *     whatever the time zone of the machine.
 * - {@link Date.parse}: Reads the date as midnight UTC, which never changes its clock,
 *   so 24 hours later is the next date.
 * - {@link dayStartOf}: Finds the midnight of both dates.
 *
 * @param time - Moment inside the day
 * @returns Start of the day, included, and start of the next day, excluded,
 * as ISO text in UTC like `closed`
 */
function dayRangeOf(time: Date): string[] {
    const today: string = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/Vienna" }).format(time);
    const tomorrow: string =
        new Date(Date.parse(today) + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
    return [dayStartOf(today), dayStartOf(tomorrow)];
}

/**
 * Finds the midnight that starts a date on the clock of the restaurant.
 * - {@link Intl.DateTimeFormat}: Writes the moment as a Vienna date, with these options:
 *   - `timeZone`: `Europe/Vienna` reads the clock of the restaurant,
 *     whatever the time zone of the machine.
 *   - `timeZoneName`: `longOffset` adds the difference to UTC like `GMT+02:00`.
 * - {@link Intl.DateTimeFormat#formatToParts}: Splits the text into parts,
 *   each with a type and a value.
 *
 * The clock changes at 01:00 UTC, so the difference at midnight UTC of the date
 * is also the difference at its midnight in Vienna.
 *
 * @param day - Date as `YYYY-MM-DD`
 * @returns Midnight of the date in Vienna as ISO text in UTC
 */
function dayStartOf(day: string): string {
    const offset: string | undefined = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Vienna",
        timeZoneName: "longOffset",
    }).formatToParts(new Date(day)).find(
        (part: Intl.DateTimeFormatPart): boolean => part.type === "timeZoneName",
    )?.value.slice(3); // Difference to UTC without GMT, like +02:00
    return new Date(`${day}T00:00:00${offset}`).toISOString();
}

/**
 * Handles a request by its method and its address.
 * - `GET /menu`: Sends menu.
 * - `GET /tables`: Sends occupied tables.
 * - `GET /tables/:table/orders`: Sends open orders of table.
 * - `POST /tables/:table/orders`: Adds/removes orders of table, queues ticket of added orders.
 * - `POST /tables/:table/lock`: Locks table for device in body.
 * - `DELETE /tables/:table/lock`: Unlocks table for device in body.
 * - `POST /tables/:table/move`: Moves table to table in body.
 * - `POST /tables/:table/pay`: Pays orders of table in body.
 * - `GET /closing`: Sends turnover and payments of today.
 *
 * A HTTP-request example as the phone sends with headers:
 *
 * ```
 * GET /menu HTTP/1.1
 * Host: localhost:3000
 * Connection: keep-alive
 * ```
 *
 * @param database - Open database
 * @param request - Request from the phone
 * @param response - Answer to the phone
 * @throws {unknown} - Error of the chosen answer thrown again
 */
async function requestHandle(database: DatabaseSync, request: IncomingMessage,
                             response: ServerResponse): Promise<void> {

    const path: string = request.url ?? ""; // Path of url, without protocol, host, port.
    const pathMatch: RegExpMatchArray | null = // Path /tables/:table/orders|lock|move|pay
        path.match(new RegExp("^/tables/([A-Z0-9]+)/(orders|lock|move|pay)$"));

    const tableId: string = pathMatch?.[1] ?? "";
    const tableResource: string = pathMatch?.[2] ?? "";

    if (request.method === "GET" && path === "/menu") {
        responseSend(response, 200, menu);

    } else if (request.method === "GET" && path === "/tables") {
        responseSend(response, 200, orders.tablesRead(database));

    } else if (request.method === "GET" && tableResource === "orders") {
        responseSend(response, 200, orders.ordersRead(database, tableId));

    } else if (request.method === "POST" && tableResource === "orders") {
        const update: orders.OrdersUpdate = await json(request) as orders.OrdersUpdate;
        orders.ordersUpdate(database, tableId, update);
        const lines: string[] = ticketOf(tableId, update.add, new Date());
        if (lines.length > 0)
            jobAdd(database, ticketBytesOf(lines));
        responseSend(response, 200, null);

    } else if (request.method === "POST" && tableResource === "lock") {
        responseSend(response, 200, tableLock(tableId, await json(request) as string));

    } else if (request.method === "DELETE" && tableResource === "lock") {
        tableUnlock(tableId, await json(request) as string);
        responseSend(response, 200, null);

    } else if (request.method === "POST" && tableResource === "move") {
        orders.tableMove(database, tableId, await json(request) as string);
        responseSend(response, 200, null);

    } else if (request.method === "POST" && tableResource === "pay") {
        orders.ordersPay(database, tableId, await json(request) as orders.OrderNew[]);
        responseSend(response, 200, null);

    } else if (request.method === "GET" && path === "/closing") {
        const [from, to]: string[] = dayRangeOf(new Date());
        responseSend(response, 200, {
            turnover: turnoverOf(database, from, to),
            payments: paymentsOf(database, from, to),
        });

    } else {
        pageSend(response, path);
    }
}
