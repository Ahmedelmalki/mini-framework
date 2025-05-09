export function createElement(vnode) {
  if (typeof vnode === "string") return document.createTextNode(vnode);

  const el = document.createElement(vnode.tag);

  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  (vnode.children || []).forEach((child) => {
    el.appendChild(createElement(child));
  });

  return el;
}

export function render(componentFn, container) {
  container.innerHTML = "";
  const vnode = componentFn();
  const el = createElement(vnode);
  container.appendChild(el);
}

export function h(tag, attrs = {}, ...children) {
  return { tag, attrs, children };
}

export function mount(vnode, container) {
  const el = document.createElement(vnode.tag);
  for (let [key, value] of Object.entries(vnode.attrs || {})) {
    el.setAttribute(key, value);
  }
  (vnode.children || []).forEach((child) => {
    el.appendChild(
      typeof child === "object" ? mount(child) : document.createTextNode(child)
    );
  });
  container.appendChild(el);
  return el;
}
