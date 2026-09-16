/**
 * ## WokFlow server
 *
 * Waits at `localhost:3000` and answers the browser with a web page.
 * Start with `npm start`.
 *
 * - `node:http`: Creates HTTP servers and sends HTTP requests.
 * - `node:stream`: Reads, writes, transforms data piece by piece.
 */

import { createServer, IncomingMessage, ServerResponse, Server } from "node:http";
import { Writable } from "node:stream";

/**
 * - {@link createServer}: Returns a new server.
 *   Node calls the function for each request with `request` to read and `response` to write.
 * - {@link ServerResponse#setHeader}: Tells the browser the answer is a web page in UTF-8,
 *   a byte format for Unicode characters.
 * - {@link Writable#end}: Sends the given text as the last piece and closes the answer.
 */
const server: Server = createServer((request: IncomingMessage, response: ServerResponse): void => {
    response.setHeader("Content-Type", "text/html; charset=utf-8");
    response.end("<button>Cola<br>可乐</button>");
});

server.listen(3000, (): void => console.log("WokFlow server: http://localhost:3000"));
