/**
 * ## Element
 *
 * Makes elements, the Chinese name and the label of both names.
 */

/**
 * Makes an element with a class and its children.
 * - {@link Element#append}: Puts the children into the element, texts as text nodes.
 *
 * @param tag - Tag name of the element
 * @param className - Class of the element
 * @param children - Elements or texts inside the element
 * @returns The element
 */
export function elementOf(tag: string, className: string, ...children: (Node | string)[]): HTMLElement {
    const element: HTMLElement = document.createElement(tag);
    element.className = className;
    element.append(...children);
    return element;
}

/**
 * Makes the Chinese name, which the page shows grey beside or below the German name.
 *
 * @param text - Chinese name
 * @returns Span in Chinese language
 */
export function chineseOf(text: string): HTMLElement {
    const chinese: HTMLElement = document.createElement("span");
    chinese.lang = "zh-Hans";
    chinese.textContent = text;
    return chinese;
}

/**
 * Makes the label of a row: the German name, the Chinese name beside it.
 *
 * @param name - German and Chinese name
 * @returns Span with both names on one line
 */
export function labelOf(name: { de: string; zh: string; }): HTMLElement {
    return elementOf("span", "menu-names", name.de, chineseOf(name.zh));
}
