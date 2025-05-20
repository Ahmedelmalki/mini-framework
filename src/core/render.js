import { createElement } from "./dom.js";

export function render(vdom, container) {
  container.innerHTML = "";
  const el = createElement(vdom);
  container.appendChild(el);
}
