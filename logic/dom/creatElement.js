export function mfCreateElement(parntId, tmpl) {
  const vnode = parseTemplate(tmpl)
  console.log('vnode ==>', vnode);
  
  const el = document.createElement(vnode.tag);

  // Set attributes
  for (const [key, value] of Object.entries(vnode.attrs || {})) {
    el.setAttribute(key, value);
  }

  // Process children
  (vnode.children || []).forEach((child) => {
    const childEl = typeof child === "string" ? document.createTextNode(child) : mfCreateElement(child);
    el.appendChild(childEl);
  });

  parntId.appendChild(el)
}

 function parseTemplate(templateString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(`<template>${templateString}</template>`, 'text/html');
  return Array.from(doc.querySelector('template').childNodes)
    .map(node => nodeToVNode(node))
    .filter(Boolean);
}

export function nodeToVNode(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent.trim();
    return text ? { type: 'text', value: text } : null;
  }

  const tag = node.nodeName.toLowerCase();
  const attrs = {};
  for (let { name, value } of node.attributes) {
    attrs[name] = value;
  }

  const children = Array.from(node.childNodes)
    .map(nodeToVNode)
    .filter(Boolean);

  return { type: 'element', tag, attrs, children };
}


export function renderVNode(vnode) {
  if (vnode.type === 'text') {
    return document.createTextNode(vnode.value);
  }

  const el = document.createElement(vnode.tag);
  for (let [key, val] of Object.entries(vnode.attrs)) {
    el.setAttribute(key, val);
  }

  vnode.children.forEach(child => {
    el.appendChild(renderVNode(child));
  });

  return el;
}
