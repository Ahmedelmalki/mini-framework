export function diff(oldTree, newTree) {
  const patches = [];
  // const index = { value: 0 };
  walk(oldTree, newTree, patches, 0);
  return patches;
}

function walk(oldNode, newNode, patches, index) {
  const patch = [];

  if (!newNode) {
    // Node removed
    patch.push({ type: "REMOVE", index });
  } else if (!oldNode) {
    // Node added
      // console.log("New node added:", newNode);
    patch.push({ type: "ADD", newNode, index: index });
  } else if (oldNode.type !== newNode.type) {
    // Node replaced
    patch.push({ type: "REPLACE", newNode });
  } else if (
    // Text content changed
    oldNode.type === "TEXT_ELEMENT" &&
    oldNode.props.nodeValue !== newNode.props.nodeValue
  ) {
    patch.push({ type: "TEXT", newNode });
  } else {
    // Check for property changes
    const propPatches = diffProps(oldNode.props, newNode.props);
    if (Object.keys(propPatches).length > 0) {
      patch.push({ type: "PROPS", propPatches });
    }

    // Diff children
    diffChildren(oldNode, newNode, patches, index);
  }

  if (patch.length > 0) {
    patches[index] = patch;
  }
}

function diffProps(oldProps, newProps) {
  const patches = {};

  // Check for changed or new props
  for (const key in newProps) {
    if (newProps[key] !== oldProps[key]) {
      patches[key] = newProps[key];
    }
  }

  // Check for removed props
  for (const key in oldProps) {
    if (!(key in newProps)) {
      patches[key] = null;
    }
  }

  return patches;
}

function diffChildren(oldNode, newNode, patches, index) {
  const oldChildren = oldNode.props.children || [];
  const newChildren = newNode.props.children || [];
  const max = Math.max(oldChildren.length, newChildren.length);

  for (let i = 0; i < max; i++) {
    index++;
    walk(oldChildren[i], newChildren[i], patches, index);
  }
}

/******************** render logic *******************/

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
      children: children.map((child) =>
        typeof child === "object" ? child : createTextElement(child)
      ),
    },
    key: props?.key ?? null, // will be used in diffing algo
  };
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  };
}

function render(element, container) {
  const dom = element.type === "TEXT_ELEMENT"
      ? document.createTextNode(element.props.nodeValue)
      : document.createElement(element.type);

  // Only set attributes/events if it's not a text node
  if (element.type !== "TEXT_ELEMENT") {
    Object.keys(element.props)
      .filter((key) => key !== "children")
      .forEach((name) => {
        const value = element.props[name];
        if (name.startsWith("on") && typeof value === "function") {
          const eventType = name.toLowerCase().substring(2);
          dom.addEventListener(eventType, value);
        } else if (name === "value" || name === "checked") {
          dom[name] = value;
        } else {
          dom.setAttribute(name, value);
        }
      });
  }

  // Render children recursively
  element.props.children.forEach((child) => render(child, dom));

  container.appendChild(dom);
}

export const ourFrame = { createElement, render };

/**************** state managment logic **************/


