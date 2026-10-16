/**
 * ## Ordered test
 *
 * Checks the ordered list of an open table on the phone.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { deepEqual } from "node:assert/strict";
import * as ordered from "../src/page/order/ordered.ts";
import { colaSmall1, colaBig1, colaBig2, colaBig3, redBull1 } from "./setup.ts";


test(
    "An update is made from the server orders, new portions and minus taps",
    (): void => {
        const list: ordered.Ordered = ordered.orderedOf([colaBig2, redBull1]);
        ordered.lineAdd(list, "Cola", "0.5");
        ordered.lineAdd(list, "Cola", "0.25");
        deepEqual(list.lines.map(ordered.quantityOf), [3, 1, 1]);

        ordered.lineRemove(list, list.lines[1]);
        ordered.lineRemove(list, list.lines[2]);
        ordered.removalUndo(list);
        deepEqual(ordered.updateOf(list), {
            add: [
                { articleId: "Cola", variantId: "0.5", quantity: 1 },
                { articleId: "Cola", variantId: "0.25", quantity: 1 },
            ],
            remove: [{ articleId: "Red Bull", variantId: null, quantity: 1 }],
        });
    }
);

test(
    "A minus takes an unsent portion before a saved one",
    (): void => {
        const list: ordered.Ordered = ordered.orderedOf([colaBig1]);
        ordered.lineAdd(list, "Cola", "0.5");

        ordered.lineRemove(list, list.lines[0]);
        deepEqual(ordered.updateOf(list), { add: [], remove: [] });

        ordered.lineRemove(list, list.lines[0]);
        deepEqual(ordered.updateOf(list), {
            add: [],
            remove: [{ articleId: "Cola", variantId: "0.5", quantity: 1 }],
        });
    }
);

test(
    "A line keeps its place at quantity 0",
    (): void => {
        const list: ordered.Ordered = ordered.orderedOf([colaSmall1, colaBig2]);
        ordered.lineRemove(list, list.lines[0]);
        deepEqual(list.lines.map(ordered.quantityOf), [0, 2]);

        ordered.lineAdd(list, "Cola", "0.25");
        deepEqual(list.lines.map(ordered.quantityOf), [1, 2]);
    }
);

test(
    "Undo takes back minus taps one by one, newest first",
    (): void => {
        const list: ordered.Ordered = ordered.orderedOf([colaBig3, redBull1]);
        ordered.lineRemove(list, list.lines[1]);
        ordered.lineRemove(list, list.lines[0]);

        ordered.removalUndo(list);
        deepEqual(list.lines.map(ordered.quantityOf), [3, 0]);

        ordered.removalUndo(list);
        deepEqual(list, ordered.orderedOf([colaBig3, redBull1]));
    }
);
