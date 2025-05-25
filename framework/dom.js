import { rerender } from "../src/main.js";

// this function create a virtual node element
const addNode = (type, props = {}, children = []) => {
  if (typeof type == "function") {
    return type(props, children);
  }
  return { type, props, children };
};

// this function create real dom tree from a virtual dom tree
const createDom = (vdom) => {
  const el = document.createElement(vdom.type);

  if (vdom.props) {
    for (const [key, value] of Object.entries(vdom.props)) {
      if (key.startsWith("on") && typeof value == "function") {
        el[key] = null;
        el[key] = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  if (vdom.children) {
    for (const child of vdom.children) {
      if (typeof child == "number" || typeof child == "string") {
        el.appendChild(document.createTextNode(child));
      } else {
        const childDom = createDom(child);
        el.appendChild(childDom);
      }
    }
  }
  return el;
};

// this function check if oldDomElement equal to newDomElement
const changed = (oldNode, newNode) => {
  let res = false;
  if (
    typeof oldNode != typeof newNode ||
    (typeof oldNode == "string" && oldNode != newNode) ||
    oldNode.type != newNode.type
  ) {
    res = true;
  }
  return res;
};

const patch = (parent, oldNode, newNode, index = 0) => {
  if (!oldNode) {
    parent.appendChild(createDom(newNode));
  } else if (!newNode) {
    parent.removeChild(parent.childNodes[index]);
  } else if (changed(oldNode, newNode)) {
    parent.replaceChild(createDom(newNode), parent.childNodes[index]);
  } else if (newNode.type) {
    const oldLen = oldNode.children.length;
    const newLen = newNode.children.length;

    for (let i = 0; i < oldLen || i < newLen; i++) {
      if (parent.childNodes[index]) {
        patch(
          parent.childNodes[index],
          oldNode.children[i],
          newNode.children[i],
          i
        );
      }
    }
  }
};

const initialRender = (child, parent) => parent.appendChild(child);

export { addNode, createDom, initialRender, patch };
