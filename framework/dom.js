const render = (child, parent) => parent.appendChild(child);

const addNode = (tagName, attrs = {}, children = []) => {
  return {
    name: tagName,
    attrs: attrs,
    children: children,
  };
};


const createEl = (tagName, attrs = {}, ...children) => {
    const el = document.createElement(tagName);

    if(attrs) {
        for (const [key, value] of Object.entries(attrs)) {
            if (key.startsWith("on") && typeof value == "function") {
                el[key] = null
                el[key] = value
            } else {
                el.setAttribute(key, value)
            }
        }
    }

    if (children) {
        children.forEach((child) => {
            if (typeof child === "string" || typeof child == "number") {
                el.appendChild(document.createTextNode(child));
            } else {
                const childDom = createEl(child.name,child.attrs,...child.children)
                el.appendChild(childDom);
            }
        });
    }
    return el;
}

const createDom = (vdom) => {
    const el = document.createElement(vdom.name);
    if(vdom.attrs) {
        for (const [key, value] of Object.entries(vdom.attrs)) {
            if (key.startsWith("on") && typeof value == "function") {
                el[key] = null
                el[key] = value
            } else {
                el.setAttribute(key, value)
            }
        }
    }
    if (vdom.children) {
        vdom.children.forEach((child) => {
            if (typeof child == "string" || typeof child == "number") {
                el.appendChild(document.createTextNode(child));
            } else {
                const childDom = createEl(child.name,child.attrs,...child.children)
                el.appendChild(childDom);
            }
        });
    }
    return el;
}


export { render, addNode, createEl, createDom };
