/**
 * ## WokFlow server
 *
 * Start with `npm start`.
 *
 * {@link serverCreate} creates the server that waits at `localhost:3000`
 * and answers each request with page file, menu, orders of a table.
 *
 * - `./database.ts`: Manages the local SQLite database connection.
 * - `./api.ts`: Connects browser requests to the server.
 * - `../tables/orderbook.ts`: Creates the database table of the orders.
 */

import { databaseOpen } from "./database.ts";
import { serverCreate } from "./api.ts";
import { orderbookCreate } from "../tables/orderbook.ts";

import type { Server } from "node:http";
import type { DatabaseSync } from "node:sqlite";


const database: DatabaseSync = databaseOpen();
orderbookCreate(database);
const server: Server = serverCreate(database);
server.listen(3000, (): void => console.log("http://localhost:3000"));
