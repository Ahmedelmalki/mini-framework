const render = (child, parent) => parent.appendChild(child);

const createVNode = (tagName, attrs = {}, children = []) => {
  return {
    name: tagName,
    attrs,
    children,
  };
};

const createDom = (tagName, attrs = {}, ...children) => {
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
            if (typeof child === "string") {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            } else if (Array.isArray(child)) {
                child.forEach((c) => el.appendChild(c));
            }
        });
    }
    return el;
}

export { render, createVNode };
