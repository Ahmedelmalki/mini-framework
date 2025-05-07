export function mfCreateElement(vnode) {
  const el = document.createElement(vnode.tag);

  // Set attributes
  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    el.setAttribute(key, value);
  }

  // Process children
  (vnode.children || []).forEach((child) => {
    const childEl =
      typeof child === "string"
        ? document.createTextNode(child)
        : mfCreateElement(child);
    el.appendChild(childEl);
  });

  return el;
}

export function parseTemplate(templateString) {
  const parser = new DOMParser();
  // Wrap in a single root so fragment parses correctly
  const doc = parser.parseFromString(
    `<template>${templateString}</template>`,
    "text/html"
  );
  return Array.from(doc.querySelector("template").childNodes).map((node) =>
    nodeToVNode(node)
  );
}

export function nodeToVNode(node) {
  // Text node
  if (node.nodeType === Node.TEXT_NODE) {
    return node.textContent.trim()
      ? { type: "text", value: node.textContent }
      : null;
  }

  // Element node
  const tag = node.nodeName.toLowerCase();
  const attrs = {};
  for (let { name, value } of Array.from(node.attributes)) {
    // Simple event handling syntax: @click → onClick
    if (name.startsWith("@")) {
      attrs["on" + name.slice(1).replace(/^\w/, (c) => c.toUpperCase())] =
        value;
    } else {
      attrs[name] = value;
    }
  }

  const children = Array.from(node.childNodes)
    .map(nodeToVNode)
    .filter((v) => v !== null);

  return { type: "element", tag, attrs, children };
}

export function renderVNode(vnode, container) {
  if (vnode.type === "text") {
    return document.createTextNode(vnode.value);
  }
  const el = document.createElement(vnode.tag);

  // Attributes & events
  for (let [key, val] of Object.entries(vnode.attrs)) {
    if (key.startsWith("on")) {
      el.addEventListener(key.slice(2).toLowerCase(), window[val]);
    } else {
      el.setAttribute(key, val);
    }
  }

  // Children
  vnode.children.forEach((child) => {
    el.appendChild(renderVNode(child, el));
  });

  return el;
}

// Usage
const vdomTree = parseTemplate(tpl);
const rootEl = renderVNode(vdomTree[0]);
document.getElementById("root").appendChild(rootEl);
