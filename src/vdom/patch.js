export function patch(dom, patches) {
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
        if (node.nodeType === Node.ELEMENT_NODE) {
          node.appendChild(newChild);
        } else if (node.parentNode) {
          node.parentNode.insertBefore(newChild, node.nextSibling);
        }
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
