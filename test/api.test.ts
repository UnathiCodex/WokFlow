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
import { deepEqual } from "node:assert/strict";
import { once } from "node:events";
import { serverCreate } from "../src/server/api.ts";
import { menu } from "../src/catalog/menu.ts";
import * as orders from "../src/tables/orders.ts";
import { databaseTest } from "./setup.ts";

import type { TestContext } from "node:test";
import type { Server } from "node:http";
import type { AddressInfo } from "node:net";
import type { DatabaseSync } from "node:sqlite";


let database: DatabaseSync;
let server: Server;
let url: string;

beforeEach(async (): Promise<void> => {
    database = databaseTest();
    server = serverCreate(database).listen(0, "127.0.0.1");
    await once(server, "listening");
    url = `http://127.0.0.1:${(server.address() as AddressInfo).port}`;
});

afterEach((): void => { server.close(); });

const colaSmall1: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.25", quantity: 1 });
const colaBig1: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.5", quantity: 1 });
const colaBig2: orders.Order = orders.orderOf({ articleId: "Cola", variantId: "0.5", quantity: 2 });
const redBull1: orders.Order = orders.orderOf({ articleId: "Red Bull", variantId: null, quantity: 1 });
const pizza1: orders.OrderNew = { articleId: "Pizza", variantId: null, quantity: 1 };


/**
 * Sends an update of a table to the test server.
 *
 * @param tableId - Table identifier
 * @param update - Value to send as JSON
 * @returns Answer of the server
 */
function updateSend(tableId: string, update: unknown): Promise<Response> {
    return fetch(`${url}/api/tables/${tableId}/orders`, { method: "POST", body: JSON.stringify(update) });
}


test(
    "A phone reads the menu and updates the orders of a table",
    async (): Promise<void> => {
        const menuRead: Response = await fetch(`${url}/api/menu`);
        deepEqual(await menuRead.json(), JSON.parse(JSON.stringify(menu)));

        const added: Response = await updateSend("14", { add: [colaBig2, redBull1], remove: [] });
        deepEqual(await added.json(), [colaBig2, redBull1]);

        const changed: Response = await updateSend("14", { add: [colaSmall1], remove: [colaBig1] });
        deepEqual(await changed.json(), [colaBig1, redBull1, colaSmall1]);

        const read: Response = await fetch(`${url}/api/tables/14/orders`);
        deepEqual(await read.json(), [colaBig1, redBull1, colaSmall1]);
        deepEqual(orders.ordersRead(database, "G3"), []);
    }
);

test(
    "A failed update gets status 400 and changes nothing",
    async (): Promise<void> => {
        await updateSend("14", { add: [colaBig1], remove: [] });
        const noPortions: Response = await updateSend("14", { add: [redBull1], remove: [colaBig2] });
        const noArticle: Response = await updateSend("14", { add: [pizza1], remove: [colaBig1] });
        deepEqual([noPortions.status, noArticle.status], [400, 400]);
        deepEqual(orders.ordersRead(database, "14"), [colaBig1]);
    }
);

test(
    "Price and tax rate come from the menu",
    async (): Promise<void> => {
        const colaCheap1: orders.Order = { ...colaBig1, price: 1, tax: 0 };
        const added: Response = await updateSend("14", { add: [colaCheap1], remove: [] });
        deepEqual(await added.json(), [colaBig1]);
    }
);

test(
    "A broken request gets status 400 and changes nothing",
    async (): Promise<void> => {
        const noJson: Response = await fetch(`${url}/api/tables/14/orders`, { method: "POST", body: "{" });
        const noLists: Response = await updateSend("14", { add: [colaBig1] });
        const noQuantity: Response = await updateSend("14", { add: [{ articleId: "Cola", variantId: "0.5" }], remove: [] });
        deepEqual([noJson.status, noLists.status, noQuantity.status], [400, 400, 400]);
        deepEqual(orders.ordersRead(database, "14"), []);
    }
);

test(
    "An unknown address gets status 404",
    async (): Promise<void> => {
        const noAddress: Response = await fetch(`${url}/api/missing`);
        const noMethod: Response = await fetch(`${url}/api/tables/14/orders`, { method: "DELETE" });
        deepEqual([noAddress.status, noMethod.status], [404, 404]);
    }
);

test(
    "A failing database gets status 500 and the server keeps running",
    async (t: TestContext): Promise<void> => {
        const logged = t.mock.method(console, "error", (): void => {});
        database.close();
        const failed: Response = await fetch(`${url}/api/tables/14/orders`);
        const next: Response = await fetch(`${url}/api/menu`);
        deepEqual([failed.status, next.status, logged.mock.callCount()], [500, 200, 1]);
    }
);
