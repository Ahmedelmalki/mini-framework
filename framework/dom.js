const addNode = (type, props = {}, children = []) => {
  return { type, props, children };
};

const createDom = (vdom) => {
    const el = document.createElement(vdom.type)

    if (vdom.props) {
        for (const [key,value] of Object.entries(vdom.props)) {
            if (key.startsWith("on") && typeof value == "function") {
                el[key] = null;
                el.addEventListener(`${key.slice(2)}`,value())
            } else {
                el.setAttribute(key,value)
            }
        }
    }
    if (vdom.children) {
        for (const child of vdom.children) {
            if (typeof child == "number" || typeof child == "string") {
                el.appendChild(document.createTextNode(child))
            } else {
                const childDom = createDom(child)
                el.appendChild(childDom)
            }
        }
    }
    return el;
}

const initialRender = (child, parent) => parent.appendChild(child)



export { addNode, createDom, initialRender };
