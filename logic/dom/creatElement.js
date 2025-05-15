export function mfCreateElement(vnode) {
    const el = document.createElement(vnode.tag);
  
    // Set attributes
    for (const [key, value] of Object.entries(vnode.attrs || {})) {
      el.setAttribute(key, value);
    }
  
    // Process children
    (vnode.children || []).forEach(child => {
      const childEl = typeof child === 'string'
        ? document.createTextNode(child)
        : mfCreateElement(child);
      el.appendChild(childEl);
    });
  
    return el;
  }

export const createEl = (tagName ,attrs = {}, ...children) =>  {
  const tag = document.createElement(tagName);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key.startsWith("on") && typeof value == "function") {
        tag.addEventListener(key.slice(2).toLowerCase(), value);
      } else {
        tag.setAttribute(key,value);
      }
    }
  }

  if (children) {
    children.flat().forEach(child=> {
      if (typeof child == "string" || typeof child == "number") {
        tag.appendChild(document.createTextNode(child))
      } else {
        tag.appendChild(child)
      }
    })
  }

  return tag
}
  