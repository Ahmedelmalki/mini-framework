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
  const tagEl = document.createElement(tagName);

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      if (key.startsWith("on") && typeof value == "function") {
        tagEl[key] = null;
        tagEl[key] = value;
      } else {
        tagEl.setAttribute(key,value);
      }
    }
  }

  if (children) {
    children.flat().forEach(child=> {
      if (typeof child == "string" || typeof child == "number") {
        tagEl.appendChild(document.createTextNode(child))
      } else {
        tagEl.appendChild(child)
      }
    })
  }

  return tagEl
}

export const setChild = (parent, child) => parent.appendChild(child);