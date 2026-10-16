/**
 * ## Panel
 *
 * A window sliding up from below, over a light veil.
 *
 * - `./element.ts`: Makes elements, the Chinese name and the label of both names.
 */

import { elementOf } from "./element.ts";


/**
 * Veil of the open panel, `null` when no panel is open.
 */
let veilOpen: HTMLElement | null = null;

/**
 * Lets Escape and Android back close the open panel.
 * Both take the step back through the history of the browser,
 * so every close is one `popstate`, like the way back of the order screen.
 * Runs once when the page loads, before any screen starts:
 * listeners of one target run in the order they were added,
 * so these run first and hide the event from the listeners of the screen.
 * Closing a panel then does not leave the screen.
 * - `popstate`: Fires when a step of the history is taken back,
 *   then removes the panel.
 * - {@link Event#stopImmediatePropagation}: Keeps the other listeners
 *   from running.
 * - {@link History#back}: Takes the step back that {@link panelOpen} added.
 */
function panelStart(): void {
    window.addEventListener("popstate", (event: PopStateEvent): void => {
        if (veilOpen === null) return;
        event.stopImmediatePropagation();
        veilOpen.remove();
        veilOpen = null;
    });

    window.addEventListener("keydown", (event: KeyboardEvent): void => {
        if (veilOpen === null || event.key !== "Escape") return;
        event.stopImmediatePropagation();
        history.back();
    }, { capture: true });
}

/**
 * Drags a panel down by its grab bar.
 * The panel follows the finger, never above its place.
 * Dragged more than a third of its height it closes, else it snaps back.
 * - {@link Element#setPointerCapture}: Sends the following pointer events
 *   to the grab bar, also when the pointer leaves it.
 * - {@link History#back}: Closes through `popstate`, see {@link panelStart}.
 *
 * @param panel - Panel to move
 * @param grab - Grab bar of the panel
 */
function panelDrag(panel: HTMLElement, grab: HTMLElement): void {
    let start: number | null = null;

    grab.addEventListener("pointerdown", (event: PointerEvent): void => {
        start = event.clientY;
        grab.setPointerCapture(event.pointerId);
    });

    grab.addEventListener("pointermove", (event: PointerEvent): void => {
        if (start !== null)
            panel.style.transform = `translateY(${Math.max(0, event.clientY - start)}px)`;
    });

    grab.addEventListener("pointerup", (event: PointerEvent): void => {
        if (start === null) return;
        const dragged: number = event.clientY - start;
        start = null;
        if (dragged > panel.offsetHeight / 3)
            history.back();
        else
            panel.style.transform = "";
    });

    grab.addEventListener("pointercancel", (): void => {
        start = null;
        panel.style.transform = "";
    });
}

/**
 * Opens a panel with the content of the caller at the bottom of the body.
 * A tap on the veil does nothing. The panel closes by dragging it down,
 * Escape and Android back, see {@link panelStart} and {@link panelDrag}.
 * - {@link History#pushState}: Adds a step, which Android back takes back.
 *
 * @param content - Content of the caller, scrolls inside the panel
 */
export function panelOpen(content: Element): void {
    const grab: HTMLElement = elementOf("div", "panel-grab");
    const scroll: HTMLElement = elementOf("div", "panel-content", content);
    const panel: HTMLElement = elementOf("div", "panel", grab, scroll);
    const veil: HTMLElement = elementOf("div", "panel-veil", panel);
    document.body.append(veil);

    veilOpen = veil;
    panelDrag(panel, grab);
    history.pushState(null, "");
}

panelStart();
