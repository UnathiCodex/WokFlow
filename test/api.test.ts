/**
 * ## API test
 *
 * Checks real HTTP requests against a test server
 * with an empty database in memory.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test, before, after, beforeEach, afterEach } from "node:test";
import { deepEqual } from "node:assert/strict";
import { menu } from "../src/catalog/menu.ts";
import {
    database, url, pageDummyCreate, pageDummyRemove, serverStart, serverStop,
    updateSend, lockSend, pathSend, colaSmall1, colaBig1, colaBig2, redBull1,
} from "./setup.ts";
import type { TestContext, Mock } from "node:test";


before(pageDummyCreate);
after(pageDummyRemove);
beforeEach(serverStart);
afterEach(serverStop);


test(
    "A phone reads the index-page",
    async (): Promise<void> => {
        const page: Response = await fetch(`${url}/`);
        deepEqual(page.headers.get("Content-Type"), "text/html; charset=utf-8");
    }
);

test(
    "A phone reads the menu and updates the orders of two tables",
    async (): Promise<void> => {
        const menuResponse: Response = await fetch(`${url}/menu`);
        deepEqual(await menuResponse.json(), JSON.parse(JSON.stringify(menu)));

        const validAdd: Response = await updateSend("14", { add: [colaBig2, redBull1], remove: [] });
        const validChange: Response = await updateSend("14", { add: [colaSmall1], remove: [colaBig1] });
        const validRead: Response = await fetch(`${url}/tables/14/orders`);
        const validTables: Response = await fetch(`${url}/tables`);

        deepEqual(await validRead.json(), [colaBig1, redBull1, colaSmall1]);
        deepEqual(await validTables.json(), ["14"]);
        deepEqual([validAdd.status, validChange.status, validRead.status], [200, 200, 200]);
    }
);

test(
    "A table is locked for one device until it is unlocked",
    async (): Promise<void> => {
        deepEqual(await lockSend("POST", "14", "phone"), true);
        deepEqual(await lockSend("POST", "14", "pc"), false);
        deepEqual(await lockSend("DELETE", "14", "phone"), null);
        deepEqual(await lockSend("POST", "14", "pc"), true);
    }
);

test(
    "An unknown address or address outside the page folder gets status 404",
    async (): Promise<void> => {
        deepEqual(await pathSend("/../src/page/index.html"), 404);
        const invalidAdress: Response = await fetch(`${url}/missing`);
        const invalidMethod: Response = await fetch(`${url}/tables/14/orders`, { method: "DELETE" });
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
        const noDatabase: Response = await fetch(`${url}/tables/14/orders`);

        const menuRead: Response = await fetch(`${url}/menu`);
        deepEqual([noPortions.status, noDatabase.status, menuRead.status], [500, 500, 200]);
        deepEqual(logged.mock.callCount(), 2);
    }
);
