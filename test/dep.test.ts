/**
 * ## DEP test
 *
 * Checks storing and reading receipts in the DEP.
 */

import { beforeEach, test } from "node:test";
import { deepEqual, equal, throws } from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { depAppend, depDatabaseCreate, depLast, depRead } from "../src/rksv/dep.ts";


let database: DatabaseSync;

beforeEach((): void => {
    database = new DatabaseSync(":memory:"); // nur im Arbeitsspeicher, danach wieder weg
    depDatabaseCreate(database);
});

test("an empty DEP has no last receipt", (): void => {
    equal(depLast(database), null);
});

test("the last receipt is the one that was appended last", (): void => {
    depAppend(database, { number: 1, jws: "jws-1", state: 0 });
    deepEqual(depLast(database), { number: 1, jws: "jws-1", state: 0 });
    depAppend(database, { number: 2, jws: "jws-2", state: 4070 });
    deepEqual(depLast(database), { number: 2, jws: "jws-2", state: 4070 });
});

test("the same receipt number cannot be used twice", (): void => {
    depAppend(database, { number: 1, jws: "jws-1", state: 0 });
    throws(
        (): void => depAppend(database, { number: 1, jws: "jws-2", state: 4070 }),
        /UNIQUE constraint failed: dep.number/);
    deepEqual(depLast(database), { number: 1, jws: "jws-1", state: 0 });
});

test("receipts in the DEP cannot be changed or deleted", (): void => {
    depAppend(database, { number: 1, jws: "jws-1", state: 0 });
    throws((): void => database.exec("UPDATE dep SET jws = 'other'"), /DEP entries cannot be changed/);
    throws((): void => database.exec("DELETE FROM dep"), /DEP entries cannot be deleted/);
    deepEqual(depLast(database), { number: 1, jws: "jws-1", state: 0 });
});

test("reading the DEP gives every receipt, oldest first", (): void => {
    deepEqual(depRead(database), []);
    depAppend(database, { number: 2, jws: "jws-2", state: 4070 });
    depAppend(database, { number: 1, jws: "jws-1", state: 0 });
    deepEqual(depRead(database), ["jws-1", "jws-2"]);
});
