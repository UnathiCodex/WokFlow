/**
 * ## Router
 *
 * Opens screens of page in empty body of `index.html`.
 *
 * - `vite/client`: Vite types for type checker only with `?raw`.
 * - `./plan/plan.html?raw`: Html as text, packed into built code by Vite.
 * - `./plan/plan.ts`: Shows occupied tables and switches areas.
 */

/// <reference types="vite/client" />
import planHtml from "./plan/plan.html?raw";
import { planStart } from "./plan/plan.ts";

document.body.innerHTML = planHtml;
planStart();
