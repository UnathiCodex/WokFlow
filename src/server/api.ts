/**
 * ## Server API
 *
 * Connects browser requests to the catalog and the saved orders.
 * GET /api/menu returns the menu with prices in euro cents.
 * GET /api/tables/:table/orders returns the open orders of a table.
 * POST to the same address saves an array of article names, variant names, quantities.
 * DELETE to the same address removes one portion by article name and variant name.
 * POST and DELETE return the table's remaining open orders.
 *
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `dinero.js`: Handles money amounts with currency.
 * - `../catalog/menu.ts`: Groups the restaurant articles.
 * - `../catalog/articles.ts`: Defines the article type with its variants.
 * - `../catalog/drinks.ts`: Defines the drink articles.
 * - `../tables/orders.ts`: Stores the orders of the tables.
 */

import { createServer } from "node:http";
import { toSnapshot } from "dinero.js";
import { menu } from "../catalog/menu.ts";
import { lemon } from "../catalog/drinks.ts";
import { ordersRead, ordersSend, ordersRemove } from "../tables/orders.ts";

import type { IncomingMessage, ServerResponse, Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";
import type { Article, Variant } from "../catalog/articles.ts";
import type { Category } from "../catalog/menu.ts";
import type { Order, OrderNew } from "../tables/orders.ts";


/**
 * An article for the browser, with prices as whole euro cents.
 */
type ArticleResponse = {
    name: { de: string; zh: string; };
    variants: { name: { de: string; zh: string; } | null; price: number; }[];
};

/**
 * The menu for the browser, grouped by category and then by article group.
 * Lemon is separate because it is an addition to drinks.
 */
export type MenuResponse = {
    categories: { [category: string]: { [group: string]: ArticleResponse[]; }; };
    lemon: ArticleResponse;
};

/**
 * The names identifying an ordered article and its variant.
 */
type OrderChoice = {
    article: string;
    variant: string | null;
};

/**
 * An invalid request with its HTTP status and a message for the browser.
 */
class RequestError extends Error {
    status: number;

    /**
     * Creates an error that can be returned to the browser.
     *
     * @param status - HTTP status code
     * @param message - Explanation in German
     */
    constructor(status: number, message: string) {
        super(message);
        this.status = status;
    }
}


/**
 * Creates the API server without starting it or opening a database.
 *
 * @param database - Open database with the orders database table
 * @returns Server ready to listen for requests
 */
export function serverCreate(database: DatabaseSync): Server {
    return createServer((request: IncomingMessage, response: ServerResponse): void => {
        requestHandle(database, request, response).catch((error: unknown): void => {
            request.resume();
            const status: number = error instanceof RequestError ? error.status : 500;
            const message: string = error instanceof RequestError ? error.message : "Interner Serverfehler.";
            if (status === 500)
                console.error(new Date().toISOString(), request.method, request.url, error);
            if (!response.destroyed && !response.writableEnded)
                responseSend(response, status, { error: message });
        });
    });
}

/**
 * Chooses the operation from the request method and address.
 *
 * @param database - Open database
 * @param request - Request from the browser
 * @param response - Answer to the browser
 */
async function requestHandle(database: DatabaseSync, request: IncomingMessage, response: ServerResponse): Promise<void> {
    const path: string = request.url?.split("?")[0] ?? "/";
    if (path === "/api/menu") {
        if (request.method !== "GET") {
            response.setHeader("Allow", "GET");
            throw new RequestError(405, "Methode nicht erlaubt.");
        }
        responseSend(response, 200, menuRead());
        return;
    }

    const match: RegExpMatchArray | null = path.match(/^\/api\/tables\/([^/]+)\/orders$/);
    if (match === null)
        throw new RequestError(404, "Adresse nicht gefunden.");

    let table_id: string;
    try {
        table_id = decodeURIComponent(match[1]);
    } catch {
        throw new RequestError(400, "Ungültige Tischkennung.");
    }
    if (table_id.trim() === "" || table_id.trim() !== table_id || table_id.length > 64 || /[\u0000-\u001f\u007f/\\]/.test(table_id))
        throw new RequestError(400, "Ungültige Tischkennung.");

    switch (request.method) {
        case "GET":
            responseSend(response, 200, ordersRead(database, table_id));
            return;
        case "POST": {
            const body: unknown = await bodyRead(request);
            if (!Array.isArray(body) || body.length === 0)
                throw new RequestError(400, "Bestellungen müssen ein nicht leeres Array sein.");
            const orders: OrderNew[] = body.map(orderNewRead);
            ordersSend(database, table_id, orders);
            responseSend(response, 201, ordersRead(database, table_id));
            return;
        }
        case "DELETE": {
            const choice: OrderChoice = orderChoiceRead(await bodyRead(request));
            const orders: Order[] = ordersRead(database, table_id);
            if (!orders.some((order: Order): boolean => order.articleId === choice.article && order.variantId === choice.variant))
                throw new RequestError(404, "Diese Bestellung ist auf dem Tisch nicht vorhanden.");
            ordersRemove(database, table_id, [{ articleId: choice.article, variantId: choice.variant, quantity: 1 }]);
            responseSend(response, 200, ordersRead(database, table_id));
            return;
        }
        default:
            response.setHeader("Allow", "GET, POST, DELETE");
            throw new RequestError(405, "Methode nicht erlaubt.");
    }
}

/**
 * Sends structured data as JSON text in UTF-8.
 *
 * @param response - Answer to the browser
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
 * Reads at most 64 KiB of JSON text and returns its value for validation.
 * The iterator leaves the connection open when the body is too large, so an error can be sent.
 *
 * @param request - Request containing JSON
 * @returns Parsed value, whose contents are still untrusted
 */
async function bodyRead(request: IncomingMessage): Promise<unknown> {
    const contentType: string | undefined = request.headers["content-type"]?.split(";")[0].trim().toLowerCase();
    if (contentType !== "application/json")
        throw new RequestError(415, "Der Inhalt muss als application/json gesendet werden.");

    request.setEncoding("utf8");
    let body: string = "";
    let bytes: number = 0;
    for await (const chunk of request.iterator({ destroyOnReturn: false })) {
        const text: string = chunk;
        bytes += Buffer.byteLength(text, "utf8");
        if (bytes > 64 * 1024)
            throw new RequestError(413, "Die Anfrage ist zu groß.");
        body += text;
    }
    try {
        return JSON.parse(body);
    } catch {
        throw new RequestError(400, "Der Inhalt ist kein gültiges JSON.");
    }
}

/**
 * Checks that a received value is an object whose properties can be examined.
 *
 * @param value - Received value
 * @returns Object with properties that still need validation
 */
function objectRead(value: unknown): { [name: string]: unknown; } {
    if (typeof value !== "object" || value === null || Array.isArray(value))
        throw new RequestError(400, "Eine Bestellung muss ein Objekt sein.");
    return value as { [name: string]: unknown; };
}

/**
 * Checks the article name and variant name received from the browser.
 *
 * @param value - Received order
 * @returns Validated names
 */
function orderChoiceRead(value: unknown): OrderChoice {
    const object: { [name: string]: unknown; } = objectRead(value);
    if (typeof object.article !== "string" || object.article.trim() === "")
        throw new RequestError(400, "Der Artikelname fehlt oder ist ungültig.");
    if (object.variant !== null && typeof object.variant !== "string")
        throw new RequestError(400, "Die Variante muss ein Name oder null sein.");
    return { article: object.article, variant: object.variant };
}

/**
 * Resolves a received order against the server catalog and checks its quantity.
 * Prices and tax rates supplied by the browser are ignored.
 *
 * @param value - Received order
 * @returns Order ready for storage with the server's article and variant
 */
function orderNewRead(value: unknown): OrderNew {
    const object: { [name: string]: unknown; } = objectRead(value);
    const choice: OrderChoice = orderChoiceRead(object);
    const quantity: unknown = object.quantity;
    if (typeof quantity !== "number" || !Number.isSafeInteger(quantity) || quantity <= 0)
        throw new RequestError(400, "Die Menge muss eine positive ganze Zahl sein.");

    const selected: { category: Category; article: Article; } = articleFind(choice.article);
    const variant: Variant | undefined = selected.article.variants.find(
        (variant: Variant): boolean => (variant.name?.de ?? null) === choice.variant,
    );
    if (variant === undefined)
        throw new RequestError(400, "Unbekannte Variante für diesen Artikel.");
    if (!Number.isSafeInteger(toSnapshot(variant.price).amount * quantity))
        throw new RequestError(400, "Die Menge ist zu groß.");
    return { category: selected.category, article: selected.article, variant, quantity };
}

/**
 * Finds an article and its category by the German article name.
 *
 * @param name - German article name
 * @returns Catalog article with its category
 */
function articleFind(name: string): { category: Category; article: Article; } {
    if (name === lemon.name.de)
        return { category: menu.drinks, article: lemon };
    for (const category of Object.values(menu)) {
        for (const articles of Object.values(category.groups)) {
            const article: Article | undefined = articles.find((article: Article): boolean => article.name.de === name);
            if (article !== undefined)
                return { category, article };
        }
    }
    throw new RequestError(400, "Unbekannter Artikel.");
}

/**
 * Prepares the catalog for the browser without changing the original data.
 *
 * @returns Categories with their article groups, plus lemon
 */
function menuRead(): MenuResponse {
    const result: MenuResponse = { categories: {}, lemon: articleRead(lemon) };
    for (const [categoryName, category] of Object.entries(menu)) {
        const groups: { [name: string]: ArticleResponse[]; } = {};
        for (const [groupName, articles] of Object.entries(category.groups))
            groups[groupName] = articles.map(articleRead);
        result.categories[categoryName] = groups;
    }
    return result;
}

/**
 * Copies an article for JSON output, replacing Dinero prices with whole euro cents.
 *
 * @param article - Catalog article
 * @returns Names and variant prices for the browser
 */
function articleRead(article: Article): ArticleResponse {
    return {
        name: article.name,
        variants: article.variants.map((variant: Variant): { name: { de: string; zh: string; } | null; price: number; } => ({
            name: variant.name,
            price: toSnapshot(variant.price).amount,
        })),
    };
}
