export function createElement(vnode) {
  const el = document.createElement(vnode.tag);

  // Set attributes
  if (vnode.attrs) {
    for (const [key, value] of Object.entries(vnode.attrs || {})) {
      el.setAttribute(key, value);
    }
  }

  // process events
  if (vnode.events) {
    Object.entries(vnode.events).forEach(([event, handler]) => {
      el[`on${event}`] = handler;
    });
  }

  // Process children
  if (vnode.children) {
    (vnode.children || []).forEach(child => {
      const childEl = typeof child === 'string'
        ? document.createTextNode(child)
        : createElement(child);
      el.appendChild(childEl);
    });
  }


  return el;
}
