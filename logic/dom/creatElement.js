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
  