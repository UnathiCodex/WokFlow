/**
 * ## Orders test
 *
 * Checks the orders of the tables against an empty database in memory.
 * Run with `node --test`.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly, down to the kind of object, and throws when they differ.
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `../src/catalog/articles.ts`: Defines the article type with its variants.
 * - `../src/catalog/menu.ts`: Groups the restaurant articles.
 * - `../src/catalog/drinks.ts`: Defines the drink articles.
 * - `../src/tables/orders.ts`: Stores the orders of the tables.
 */

import { test } from "node:test";
import { deepEqual, throws } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { article, variant } from "../src/catalog/articles.ts";
import { menu } from "../src/catalog/menu.ts";
import { lemon } from "../src/catalog/drinks.ts";
import { orderbookCreate, ordersSend, orderRemove, ordersRead, tableClose } from "../src/tables/orders.ts";
import type { Article, Variant } from "../src/catalog/articles.ts";


const cola: Article = article("Cola", "可乐", [
    variant("0.25", "0.25", 310),
    variant("0.5", "0.5", 450),
]);
const colaSmall: Variant = cola.variants[0];
const colaBig: Variant = cola.variants[1];
const redBull: Article = article("Red Bull", "红牛", 400);
const tapWater: Article = article("Leitungswasser", "自来水", 70);
const buffetSunday: Article = article("Sonntagsbuffet", "周日自助餐", [
    variant("Erwachsene", "成人", 1990),
    variant("6–9", "儿童", 1290),
]);

/**
 * Opens an empty database in memory with the orders database table.
 *
 * @returns Database connection object
 */
function databaseFresh(): DatabaseSync {
    const database: DatabaseSync = new DatabaseSync(":memory:");
    orderbookCreate(database);
    return database;
}

test("a free table has no orders", (): void => {
    deepEqual(ordersRead(databaseFresh(), "14"), []);
});

test("sending saves the orders of a table", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 2 },
        { category: menu.drinks, article: redBull, variant: redBull.variants[0], quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 2, price: 450, tax: 20 },
        { article: "Red Bull", variant: null, quantity: 1, price: 400, tax: 20 },
    ]);
});

test("sending the same variant again adds a new order", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 2 },
    ]);
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 2, price: 450, tax: 20 },
        { article: "Cola", variant: "0.5", quantity: 1, price: 450, tax: 20 },
    ]);
});

test("the price comes from the variant and the tax rate from the category", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaSmall, quantity: 1 },
        { category: menu.food, article: cola, variant: colaBig, quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.25", quantity: 1, price: 310, tax: 20 },
        { article: "Cola", variant: "0.5", quantity: 1, price: 450, tax: 10 },
    ]);
});

test("tap water is taxed like food", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: tapWater, variant: tapWater.variants[0], quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Leitungswasser", variant: null, quantity: 1, price: 70, tax: 10 },
    ]);
});

test("lemon and buffet people are orders like any other", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: lemon, variant: lemon.variants[0], quantity: 1 },
        { category: menu.buffet, article: buffetSunday, variant: buffetSunday.variants[0], quantity: 2 },
        { category: menu.buffet, article: buffetSunday, variant: buffetSunday.variants[1], quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Zitrone", variant: null, quantity: 1, price: 20, tax: 20 },
        { article: "Sonntagsbuffet", variant: "Erwachsene", quantity: 2, price: 1990, tax: 10 },
        { article: "Sonntagsbuffet", variant: "6–9", quantity: 1, price: 1290, tax: 10 },
    ]);
});

test("sending saves all orders or none", (): void => {
    const database: DatabaseSync = databaseFresh();
    throws((): void => ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
        { category: menu.drinks, article: redBull, variant: redBull.variants[0], quantity: 0 },
    ]), /CHECK constraint failed/);
    deepEqual(ordersRead(database, "14"), []);
});

test("removing takes one portion off the newest order of a variant", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 2 },
    ]);
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
    ]);
    orderRemove(database, "14", "Cola", "0.5");
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 2, price: 450, tax: 20 },
    ]);
    orderRemove(database, "14", "Cola", "0.5");
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 1, price: 450, tax: 20 },
    ]);
    orderRemove(database, "14", "Cola", "0.5");
    deepEqual(ordersRead(database, "14"), []);
    throws((): void => orderRemove(database, "14", "Cola", "0.5"), /has no portion/);
});

test("removing leaves other variants alone", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaSmall, quantity: 1 },
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
        { category: menu.drinks, article: redBull, variant: redBull.variants[0], quantity: 1 },
    ]);
    orderRemove(database, "14", "Cola", "0.25");
    orderRemove(database, "14", "Red Bull", null);
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 1, price: 450, tax: 20 },
    ]);
});

test("removing from a free table fails", (): void => {
    throws((): void => orderRemove(databaseFresh(), "14", "Cola", "0.5"), /has no portion/);
});

test("closing frees the table for the next guests", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
    ]);
    tableClose(database, "14");
    deepEqual(ordersRead(database, "14"), []);
    throws((): void => orderRemove(database, "14", "Cola", "0.5"), /has no portion/);
    ordersSend(database, "14", [
        { category: menu.drinks, article: redBull, variant: redBull.variants[0], quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "14"), [
        { article: "Red Bull", variant: null, quantity: 1, price: 400, tax: 20 },
    ]);
});

test("closing a free table fails", (): void => {
    throws((): void => tableClose(databaseFresh(), "14"), /has no open orders/);
});

test("tables do not share orders", (): void => {
    const database: DatabaseSync = databaseFresh();
    ordersSend(database, "14", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
    ]);
    ordersSend(database, "G3", [
        { category: menu.drinks, article: cola, variant: colaBig, quantity: 1 },
        { category: menu.drinks, article: redBull, variant: redBull.variants[0], quantity: 1 },
    ]);
    deepEqual(ordersRead(database, "M"), []);
    throws((): void => orderRemove(database, "14", "Red Bull", null), /has no portion/);
    orderRemove(database, "G3", "Cola", "0.5");
    deepEqual(ordersRead(database, "14"), [
        { article: "Cola", variant: "0.5", quantity: 1, price: 450, tax: 20 },
    ]);
    tableClose(database, "14");
    deepEqual(ordersRead(database, "G3"), [
        { article: "Red Bull", variant: null, quantity: 1, price: 400, tax: 20 },
    ]);
});
