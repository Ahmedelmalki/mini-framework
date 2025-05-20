/******************** element creation and event handling *****************/
export function diff(oldTree, newTree) {
  return function applyPatches(dom) {
    if (!dom) {
      console.warn("DOM element is null or undefined");
      return;
    }

    if (!oldTree) {
      return dom.appendChild(createElement(newTree));
    }

    if (!newTree) {
      if (dom instanceof Node && dom.parentNode) {
        return dom.parentNode.removeChild(dom);
      } else {
        console.warn("don't remove it if is note node or doesn't exist blan:", dom);
        return;
      }
    }


    if (oldTree.type !== newTree.type) {
      return dom.parentNode.replaceChild(createElement(newTree), dom);
    }

    if (newTree.type === "TEXT_ELEMENT") {
      if (dom.nodeType === Node.TEXT_NODE &&
        oldTree.props.nodeValue !== newTree.props.nodeValue) {
        dom.nodeValue = newTree.props.nodeValue;
      }
      return;
    }

    // update properties
    updateProps(dom, oldTree.props, newTree.props);

    const oldChildren = oldTree.props.children || [];
    const newChildren = newTree.props.children || [];

    const maxLnt = Math.max(oldChildren.length, newChildren.length);
    const domChildren = Array.from(dom.childNodes); // avoid live list issues

    for (let i = 0; i < maxLnt; i++) {
      if (i < oldChildren.length && i < newChildren.length) {
        if (dom.childNodes[i]) {
          diff(oldChildren[i], newChildren[i])(dom.childNodes[i]);
        } else {
          dom.appendChild(createElement(newChildren[i]));
        }
      } else if (i < newChildren.length) {
        dom.appendChild(createElement(newChildren[i])); // add new child
      } else if (i < oldChildren.length) {
        const childNode = dom.childNodes[i];
        if (childNode && childNode instanceof Node) {
          dom.removeChild(childNode); // ila kan valid omachi undefined
        } else {
          console.warn("Tried to remove non-existent or invalid child node at index", i, childNode);
        }
      }
    }
  };
}

function updateProps(dom, oldProps, newProps) {
  for (const key in newProps) {
    if (key === "children") continue;

    if (oldProps[key] !== newProps[key]) {
      if (key.startsWith("on") && typeof newProps[key] === "function") {
        const eventType = key.toLowerCase().substring(2);
        if (oldProps[key]) {
          dom.removeEventListener(eventType, oldProps[key]);
        }
        dom.addEventListener(eventType, newProps[key]);
      } else if (key === "value" || key === "checked") {
        dom[key] = newProps[key];
      } else {
        dom.setAttribute(key, newProps[key]);
      }
    }
  }

  for (const key in oldProps) {
    if (key === "children") continue;
    if (!(key in newProps)) {
      if (key.startsWith("on")) {
        const eventType = key.toLowerCase().substring(2);
        dom.removeEventListener(eventType, oldProps[key]);
      } else {
        dom.removeAttribute(key);
      }
    }
  }
}

export function createElement(vNode) {
  if (!vNode) return null;

  if (vNode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const element = document.createElement(vNode.type);

  // Set properties
  for (const key in vNode.props) {
    if (key === "children") continue;

    const value = vNode.props[key];
    if (key.startsWith("on") && typeof value === "function") {
      const eventType = key.toLowerCase().substring(2);
      element.addEventListener(eventType, value);
    } else if (key === "value" || key === "checked") {
      element[key] = value;
    } else {
      element.setAttribute(key, value);
    }
  }

  // Create and append children
  (vNode.props.children || []).forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}

export function patch(container, oldTree, newTree) {
  if (!container) {
    console.warn("container is null or undefined");
    return;
  }
  const patchFn = diff(oldTree, newTree);
  patchFn(container.firstChild || container);
}

// Function to create elements (same as before)
function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function createVElement(type, props = {}, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
  };
}

/********************* rendering logic **********************/
function render(element, container) {
  const dom = createElement(element);
  container.appendChild(dom);
  return dom;
}

export const ourFrame = {
  createElement: createVElement,
  render,
  patch,
};
