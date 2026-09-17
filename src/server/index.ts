/**
 * ## WokFlow server
 *
 * Waits at `localhost:3000` and answers the browser with menu and order data.
 * Start with `npm start`.
 *
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:sqlite`: Opens and works with SQLite databases.
 * - `./database.ts`: Manages the local SQLite database connection.
 * - `./api.ts`: Connects browser requests to the catalog and the saved orders.
 * - `../tables/orders.ts`: Stores the orders of the tables.
 */

import { databaseOpen } from "./database.ts";
import { serverCreate } from "./api.ts";
import { orderbookCreate } from "../tables/orders.ts";

import type { Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";


const database: DatabaseSync = databaseOpen();
orderbookCreate(database);

/**
 * API server using the open database.
 */
const server: Server = serverCreate(database);

server.listen(3000, (): void => console.log("WokFlow server: http://localhost:3000"));
