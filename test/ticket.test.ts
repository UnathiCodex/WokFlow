/**
 * ## Ticket test
 *
 * Checks the text of the order ticket.
 *
 * - `node:test`: Runs tests and reports the results.
 * - `node:assert/strict`: Compares values exactly including types.
 */

import { test } from "node:test";
import { deepEqual } from "node:assert/strict";
import { ticketOf } from "../src/ticket/ticket.ts";
import { colaBig2, redBull1 } from "./setup.ts";
import type { OrderNew } from "../src/tables/orders.ts";


const timeSummer: Date = new Date("2026-07-14T10:05:00Z"); // 12:05 in Vienna, UTC+2
const duck1: OrderNew = { articleId: "Knusprige Ente", variantId: null, quantity: 1 };
const buffetAdult3: OrderNew = { articleId: "Mittagsbuffet", variantId: "Erwachsene", quantity: 3 };


test(
    "Drinks and food print in the order sent, the buffet is left out",
    (): void => {
        deepEqual(ticketOf("14", [colaBig2, buffetAdult3, duck1, redBull1], timeSummer), [
            "Tisch 14",
            "12:05",
            "2 Cola 0.5",
            "1 Knusprige Ente",
            "1 Red Bull",
        ]);
    }
);

test(
    "Only buffet prints no ticket",
    (): void => {
        deepEqual(ticketOf("14", [buffetAdult3], timeSummer), []);
    }
);

test(
    "Mitnehmen is named on the ticket",
    (): void => {
        deepEqual(ticketOf("M", [redBull1], timeSummer), ["Mitnehmen", "12:05", "1 Red Bull"]);
    }
);
