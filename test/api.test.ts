/**
 * ## API test
 *
 * Checks real HTTP requests against a local server and an empty database in memory.
 * Run with `node --test test/api.test.ts`.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly and throws when they differ.
 * - `node:events`: Waits for events from the test server.
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:net`: Describes network addresses.
 * - `dinero.js`: Handles money amounts with currency.
 */

import { test } from "node:test";
import { deepEqual, equal, ok } from "node:assert/strict";
import { once } from "node:events";
import { DatabaseSync } from "node:sqlite";
import { request } from "node:http";
import { toSnapshot } from "dinero.js";
import { serverCreate } from "../src/server/api.ts";
import { orderbookCreate, ordersRead } from "../src/tables/orders.ts";
import { menu } from "../src/catalog/menu.ts";

import type { TestContext } from "node:test";
import type { Server, ClientRequest, IncomingMessage } from "node:http";
import type { AddressInfo } from "node:net";
import type { MenuResponse } from "../src/server/api.ts";
import type { Order } from "../src/tables/orders.ts";


/**
 * A local test server's address and its isolated database.
 */
type ServerTest = {
    url: string;
    database: DatabaseSync;
};

const cola: { article: string; variant: string; quantity: number; } = {
    article: "Cola", variant: "0.5", quantity: 2,
};
const colaSaved: Order = { articleId: "Cola", variantId: "0.5", quantity: 2, price: 450, tax: 20 };

/**
 * Starts a server on an available local port and closes its resources after the test.
 *
 * @param t - Current test
 * @returns Server address and database
 */
async function serverTest(t: TestContext): Promise<ServerTest> {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    orderbookCreate(database);
    const server: Server = serverCreate(database);
    t.after(async (): Promise<void> => {
        try {
            await new Promise<void>((resolve, reject): void => {
                server.close((error: Error | undefined): void => {
                    if (error) reject(error);
                    else resolve();
                });
            });
        } finally {
            database.close();
        }
    });
    server.listen(0, "127.0.0.1");
    await once(server, "listening");
    const address: AddressInfo = server.address() as AddressInfo;
    return { url: `http://127.0.0.1:${address.port}`, database };
}

/**
 * Sends a request whose body is JSON when supplied.
 *
 * @param url - Full request address
 * @param method - HTTP method
 * @param body - Optional data to send
 * @returns Server response
 */
function requestSend(url: string, method: string, body?: unknown): Promise<Response> {
    return fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: body === undefined ? undefined : JSON.stringify(body),
    });
}


test("the menu contains bilingual articles, cent prices, lemon", async (t: TestContext): Promise<void> => {
    const { url } = await serverTest(t);
    const response: Response = await fetch(`${url}/api/menu`);
    equal(response.status, 200);
    equal(response.headers.get("content-type"), "application/json; charset=utf-8");
    equal(response.headers.get("cache-control"), "no-store");
    const body: MenuResponse = await response.json();
    deepEqual(Object.keys(body.categories), ["buffet", "food", "drinks"]);
    for (const [categoryName, category] of Object.entries(menu)) {
        deepEqual(Object.keys(body.categories[categoryName]), Object.keys(category.groups));
        for (const [groupName, articles] of Object.entries(category.groups)) {
            const received = body.categories[categoryName][groupName];
            equal(received.length, articles.length);
            for (let index: number = 0; index < articles.length; index++) {
                deepEqual(received[index].name, articles[index].name);
                deepEqual(received[index].variants, articles[index].variants.map((variant) => ({
                    name: variant.name, price: toSnapshot(variant.price).amount,
                })));
            }
        }
    }
    deepEqual(body.lemon, { name: { de: "Zitrone", zh: "柠檬" }, variants: [{ name: null, price: 20 }] });
});

test("article names and variant names identify catalog choices unambiguously", (): void => {
    const names: string[] = [];
    for (const category of Object.values(menu)) {
        for (const articles of Object.values(category.groups)) {
            for (const article of articles) {
                names.push(article.name.de);
                const variants: (string | null)[] = article.variants.map((variant) => variant.name?.de ?? null);
                equal(new Set(variants).size, variants.length, article.name.de);
            }
        }
    }
    names.push("Zitrone");
    equal(new Set(names).size, names.length);
});

test("a free table returns an empty array", async (t: TestContext): Promise<void> => {
    const { url } = await serverTest(t);
    const response: Response = await fetch(`${url}/api/tables/14/orders`);
    equal(response.status, 200);
    deepEqual(await response.json(), []);
});

test("sending orders saves them and a later request reads them", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [
        cola, { article: "Red Bull", variant: null, quantity: 1 },
    ]);
    const expected: Order[] = [colaSaved, { articleId: "Red Bull", variantId: null, quantity: 1, price: 400, tax: 20 }];
    equal(response.status, 201);
    deepEqual(await response.json(), expected);
    deepEqual(ordersRead(database, "14"), expected);
    const read: Response = await fetch(`${url}/api/tables/14/orders`);
    deepEqual(await read.json(), expected);
});

test("prices and tax rates come from the server catalog", async (t: TestContext): Promise<void> => {
    const { url } = await serverTest(t);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [
        { ...cola, price: 1, tax: 0, category: "food" },
        { article: "Leitungswasser", variant: "0.25", quantity: 1, tax: 20 },
        { article: "Zitrone", variant: null, quantity: 1 },
        { article: "Sonntagsbuffet", variant: "6–9", quantity: 2 },
    ]);
    equal(response.status, 201);
    deepEqual(await response.json(), [
        colaSaved,
        { articleId: "Leitungswasser", variantId: "0.25", quantity: 1, price: 70, tax: 10 },
        { articleId: "Zitrone", variantId: null, quantity: 1, price: 20, tax: 20 },
        { articleId: "Sonntagsbuffet", variantId: "6–9", quantity: 2, price: 1290, tax: 10 },
    ]);
});

test("later sendings add orders and leave other tables alone", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    await requestSend(`${url}/api/tables/14/orders`, "POST", [cola]);
    await requestSend(`${url}/api/tables/G3/orders`, "POST", [{ ...cola, quantity: 1 }]);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [{ ...cola, quantity: 3 }]);
    equal(response.status, 201);
    deepEqual(await response.json(), [colaSaved, { ...colaSaved, quantity: 3 }]);
    deepEqual(ordersRead(database, "G3"), [{ ...colaSaved, quantity: 1 }]);
});

test("invalid order shapes and quantities do not write anything", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const invalid: unknown[] = [
        null, {}, [], "Cola", [null], [1], [[]], [{}],
        [{ article: "Cola", quantity: 1 }],
        [{ article: 123, variant: null, quantity: 1 }],
        [{ article: "", variant: null, quantity: 1 }],
        [{ ...cola, variant: {} }],
        [{ ...cola, quantity: 0 }],
        [{ ...cola, quantity: -1 }],
        [{ ...cola, quantity: 1.5 }],
        [{ ...cola, quantity: "2" }],
        [{ ...cola, quantity: null }],
        [{ ...cola, quantity: Number.MAX_SAFE_INTEGER + 1 }],
        [{ ...cola, quantity: Number.MAX_SAFE_INTEGER }],
    ];
    for (const body of invalid) {
        const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", body);
        equal(response.status, 400, JSON.stringify(body));
        const error: { error: string; } = await response.json();
        ok(error.error.length > 0);
        deepEqual(ordersRead(database, "14"), []);
    }
});

test("unknown articles and mismatched variants are rejected", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    for (const choice of [
        { ...cola, article: "Missing" },
        { ...cola, variant: "Missing" },
        { ...cola, variant: null },
        { article: "Red Bull", variant: "0.5", quantity: 1 },
    ]) {
        const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [choice]);
        equal(response.status, 400);
        deepEqual(ordersRead(database, "14"), []);
    }
});

test("an invalid sending keeps earlier orders and saves none of the new ones", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    await requestSend(`${url}/api/tables/14/orders`, "POST", [cola]);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [
        { article: "Red Bull", variant: null, quantity: 1 },
        { ...cola, quantity: 0 },
    ]);
    equal(response.status, 400);
    deepEqual(ordersRead(database, "14"), [colaSaved]);
});

test("malformed or empty JSON is rejected without writing orders", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    for (const body of ["", "[", "{invalid}"]) {
        const response: Response = await fetch(`${url}/api/tables/14/orders`, {
            method: "POST", headers: { "Content-Type": "application/json" }, body,
        });
        equal(response.status, 400);
        deepEqual(await response.json(), { error: "Der Inhalt ist kein gültiges JSON." });
    }
    deepEqual(ordersRead(database, "14"), []);
});

test("requests with a different content type are rejected", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const response: Response = await fetch(`${url}/api/tables/14/orders`, {
        method: "POST", headers: { "Content-Type": "text/plain" }, body: JSON.stringify([cola]),
    });
    equal(response.status, 415);
    deepEqual(ordersRead(database, "14"), []);
});

test("an oversized body receives a JSON error and leaves the server usable", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [
        { ...cola, note: "x".repeat(70 * 1024) },
    ]);
    equal(response.status, 413);
    deepEqual(await response.json(), { error: "Die Anfrage ist zu groß." });
    deepEqual(ordersRead(database, "14"), []);
    const next: Response = await requestSend(`${url}/api/tables/14/orders`, "POST", [cola]);
    equal(next.status, 201);
});

test("JSON arriving in pieces preserves split UTF-8 characters", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const body: Buffer = Buffer.from(JSON.stringify([{ article: "Hefetrüb", variant: "0.5", quantity: 1 }]));
    const split: number = body.indexOf(Buffer.from("ü")) + 1;
    const status: number | undefined = await new Promise((resolve, reject): void => {
        const sending: ClientRequest = request(`${url}/api/tables/14/orders`, {
            method: "POST", headers: { "Content-Type": "application/json; charset=utf-8" },
        }, (response: IncomingMessage): void => {
            response.on("error", reject);
            response.on("end", (): void => resolve(response.statusCode));
            response.resume();
        });
        sending.on("error", reject);
        sending.write(body.subarray(0, split));
        setImmediate((): void => { sending.end(body.subarray(split)); });
    });
    equal(status, 201);
    deepEqual(ordersRead(database, "14"), [{ article: "Hefetrüb", variant: "0.5", quantity: 1, price: 500, tax: 20 }]);
});

test("removing takes the newest portion and preserves other tables", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    await requestSend(`${url}/api/tables/14/orders`, "POST", [cola]);
    await requestSend(`${url}/api/tables/14/orders`, "POST", [{ ...cola, quantity: 1 }]);
    await requestSend(`${url}/api/tables/G3/orders`, "POST", [cola]);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "DELETE", { article: "Cola", variant: "0.5" });
    equal(response.status, 200);
    deepEqual(await response.json(), [colaSaved]);
    const next: Response = await requestSend(`${url}/api/tables/14/orders`, "DELETE", { article: "Cola", variant: "0.5" });
    deepEqual(await next.json(), [{ ...colaSaved, quantity: 1 }]);
    deepEqual(ordersRead(database, "G3"), [colaSaved]);
});

test("removing the last portion frees the table and removing again fails", async (t: TestContext): Promise<void> => {
    const { url } = await serverTest(t);
    const choice: { article: string; variant: null; } = { article: "Red Bull", variant: null };
    await requestSend(`${url}/api/tables/M/orders`, "POST", [{ ...choice, quantity: 1 }]);
    const removed: Response = await requestSend(`${url}/api/tables/M/orders`, "DELETE", choice);
    equal(removed.status, 200);
    deepEqual(await removed.json(), []);
    const missing: Response = await requestSend(`${url}/api/tables/M/orders`, "DELETE", choice);
    equal(missing.status, 404);
});

test("removing validates names before changing orders", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    await requestSend(`${url}/api/tables/14/orders`, "POST", [cola]);
    for (const choice of [null, [], {}, { article: "Cola" }, { article: 1, variant: null }]) {
        const response: Response = await requestSend(`${url}/api/tables/14/orders`, "DELETE", choice);
        equal(response.status, 400);
    }
    const missing: Response = await requestSend(`${url}/api/tables/14/orders`, "DELETE", { article: "Cola", variant: "0.25" });
    equal(missing.status, 404);
    deepEqual(ordersRead(database, "14"), [colaSaved]);
});

test("an old order can be removed even when its article is no longer in the catalog", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    database.prepare("INSERT INTO orders (table_id, article, variant, quantity, price, tax) VALUES (?, ?, ?, ?, ?, ?)")
        .run("14", "Old article", null, 1, 300, 20);
    const response: Response = await requestSend(`${url}/api/tables/14/orders`, "DELETE", { article: "Old article", variant: null });
    equal(response.status, 200);
    deepEqual(await response.json(), []);
});

test("unknown addresses and unsupported methods have distinct errors", async (t: TestContext): Promise<void> => {
    const { url } = await serverTest(t);
    const missing: Response = await fetch(`${url}/api/missing`);
    equal(missing.status, 404);
    const menuResponse: Response = await requestSend(`${url}/api/menu`, "POST", []);
    equal(menuResponse.status, 405);
    equal(menuResponse.headers.get("allow"), "GET");
    const ordersResponse: Response = await requestSend(`${url}/api/tables/14/orders`, "PUT", []);
    equal(ordersResponse.status, 405);
    equal(ordersResponse.headers.get("allow"), "GET, POST, DELETE");
});

test("table identifiers are decoded and invalid identifiers are rejected", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const valid: Response = await requestSend(`${url}/api/tables/%47%33/orders`, "POST", [cola]);
    equal(valid.status, 201);
    deepEqual(ordersRead(database, "G3"), [colaSaved]);
    for (const table of ["%", "%20", "%2F", "%00", "x".repeat(65)]) {
        const response: Response = await fetch(`${url}/api/tables/${table}/orders`);
        equal(response.status, 400, table);
    }
});

test("unexpected database errors are logged and hidden from the browser", async (t: TestContext): Promise<void> => {
    const { url, database } = await serverTest(t);
    const logged = t.mock.method(console, "error", (): void => {});
    database.exec("DROP TABLE orders");
    const response: Response = await fetch(`${url}/api/tables/14/orders`);
    equal(response.status, 500);
    deepEqual(await response.json(), { error: "Interner Serverfehler." });
    equal(logged.mock.callCount(), 1);
});
