/**
 * ## API test
 *
 * Checks real HTTP requests against a test server
 * with an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 * - `node:events`: Waits for an event of an object.
 */

import { test, beforeEach, afterEach } from "node:test";
import { deepEqual, equal } from "node:assert/strict";
import { once } from "node:events";
import { serverCreate } from "../src/server/api.ts";
import { menu } from "../src/catalog/menu.ts";
import { databaseTest, colaSmall1, colaBig1, colaBig2, redBull1 } from "./setup.ts";

import type { TestContext, Mock } from "node:test";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { DatabaseSync } from "node:sqlite";


let database: DatabaseSync;
let server: Server;
let url: string;

// Fresh database and fresh server on a free port before each test
beforeEach(async (): Promise<void> => {
    database = databaseTest();
    server = serverCreate(database).listen(0, "127.0.0.1");
    await once(server, "listening");
    url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

// Closes the server after each test, otherwise the test file never ends
afterEach((): void => {
    server.close();
});


/**
 * Sends an update of a table to the test server with
 * - {@link fetch}: Sends an HTTP request.
 * - {@link RequestInit.method}: HTTP method as text.
 *   Common values: `GET` (default), `POST`, `PUT`, `PATCH`,
 *   `DELETE`, `HEAD`, `OPTIONS`.
 * - {@link RequestInit.body}: Data to send, here JSON text from
 *   {@link JSON.stringify}. Omitted for `GET` and `HEAD`.
 *
 * @param tableId - Table identifier
 * @param update - Value to send as JSON
 * @returns Answer of the server
 */
function updateSend(tableId: string, update: unknown): Promise<Response> {
    return fetch(`${url}/api/tables/${tableId}/orders`, {
        method: "POST",
        body: JSON.stringify(update),
    });
}


test(
    "A phone reads the menu and updates the orders of two tables",
    async (): Promise<void> => {
        const menuResponse: Response = await fetch(`${url}/api/menu`);
        deepEqual(await menuResponse.json(), JSON.parse(JSON.stringify(menu)));

        const added: Response = await updateSend("14", { add: [colaBig2, redBull1], remove: [] });
        const changed: Response = await updateSend("14", { add: [colaSmall1], remove: [colaBig1] });
        deepEqual([added.status, changed.status], [200, 200]);

        const read14: Response = await fetch(`${url}/api/tables/14/orders`);
        deepEqual(await read14.json(), [colaBig1, redBull1, colaSmall1]);
    }
);

test(
    "An unknown address gets status 404",
    async (): Promise<void> => {
        const invalidAdress: Response = await fetch(`${url}/api/missing`);
        const invalidMethod: Response = await fetch(`${url}/api/tables/14/orders`, { method: "DELETE" });
        deepEqual([invalidAdress.status, invalidMethod.status], [404, 404]);
    }
);

test(
    "A failure gets status 500 and the server keeps running",
    async (t: TestContext): Promise<void> => {
        const logged: Mock<((...data: any[]) => void) | (() => void)> =
            t.mock.method(console, "error", (): void => {});

        const noPortions: Response = await updateSend("14", { add: [], remove: [colaBig1] });
        database.close();
        const noDatabase: Response = await fetch(`${url}/api/tables/14/orders`);

        const menuRead: Response = await fetch(`${url}/api/menu`);
        deepEqual([noPortions.status, noDatabase.status, menuRead.status], [500, 500, 200]);
        deepEqual(logged.mock.callCount(), 2);
    }
);
