export function patch(dom, patches) {
  //const index = { value: 0 };
  walk(dom, patches, 0);
}

function walk(node, patches, index) {
  const currentPatches = patches[index];
  if (currentPatches) {
    applyPatches(node, currentPatches);
  }

  const childNodes = node.childNodes || [];
  childNodes.forEach((child) => {
    index++;
    walk(child, patches, index);
  });
}

function applyPatches(node, patches) {
  patches.forEach((patch) => {
    switch (patch.type) {
      case "REMOVE":
        node.parentNode.removeChild(node);
        break;
      case "ADD":
        const newChild = createElement(patch.newNode);
        node.appendChild(newChild);
        //That way, the patch adds a sibling in the correct spot, not a child of the current node
        break;
      case "REPLACE":
        const replacedNode = createElement(patch.newNode);
        node.parentNode.replaceChild(replacedNode, node);
        break;
      case "TEXT":
        node.nodeValue = patch.newNode.props.nodeValue;
        break;
      case "PROPS":
        for (const key in patch.propPatches) {
          const value = patch.propPatches[key];
          if (key === "children") continue; // Skip illegal assignment

          if (key.startsWith("on") && typeof value === "function") {
            const eventType = key.toLowerCase().slice(2);
            node.addEventListener(eventType, value);
          } else if (value === null) {
            node.removeAttribute(key);
          } else if (key === "value" || key === "checked") {
            node[key] = value;
          } else {
            node.setAttribute(key, value);
          }
        }
        break;
    }
  });
}

function createElement(vNode) {
  if (vNode.type === "TEXT_ELEMENT") {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const element = document.createElement(vNode.type);

  for (const prop in vNode.props) {
    if (prop === "children") continue;
    const value = vNode.props[prop];

    if (prop.startsWith("on") && typeof value === "function") {
      const eventType = prop.toLowerCase().slice(2);
      element.addEventListener(eventType, value);
    } else if (prop === "value" || prop === "checked") {
      element[prop] = value;
    } else {
      element.setAttribute(prop, value);
    }
  }

  vNode.props.children.forEach((child) => {
    element.appendChild(createElement(child));
  });

  return element;
}
