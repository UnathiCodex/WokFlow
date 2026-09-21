/**
 * ## Router
 *
 * Opens screens of page in empty body of `index.html`.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `./plan.html?raw`: Html as text, packed into built code by Vite.
 * - `./plan.ts`: Shows occupied tables on the plan.
 */

/// <reference types="vite/client" />
import planHtml from "./plan.html?raw";
import { planStart } from "./plan.ts";

document.body.innerHTML = planHtml;
planStart();
