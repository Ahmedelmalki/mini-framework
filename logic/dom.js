export function h(tag, attrs = {}, ...children) {
  return { tag, attrs, children: children.flat() };
}

export function createElement(vnode) {
  if (typeof vnode === "string" || typeof vnode === "number") 
    return document.createTextNode(vnode);

  const el = document.createElement(vnode.tag);

  // Handle attributes and event listeners properly
  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    if (key.startsWith("on") && typeof value === "function") {
      el.addEventListener(key.slice(2).toLowerCase(), value);
    } else {
      el.setAttribute(key, value);
    }
  }

  // Process children
  (vnode.children || []).forEach((child) => {
    el.appendChild(
      typeof child === "object" && child !== null 
        ? createElement(child) 
        : document.createTextNode(child)
    );
  });

  return el;
}

export function mount(vnode, container) {
  if (!container) {
    // When used as a helper function without a container
    return createElement(vnode);
  }
  
  const el = createElement(vnode);
  container.appendChild(el);
  return el;
}

export function render(componentFn, container) {
  container.innerHTML = ""; // Clear previous content
  const vnode = typeof componentFn === "function" ? componentFn() : componentFn;
  const el = createElement(vnode);
  container.appendChild(el);
  return el;
}

// Function to update only changed parts of the DOM
export function patch(oldVNode, newVNode, container) {
  // Simple implementation that replaces the entire node for now
  // A real implementation would diff and only update changed parts
  container.innerHTML = "";
  mount(newVNode, container);
}