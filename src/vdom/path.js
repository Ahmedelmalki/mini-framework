export function patch(dom, patches) {
  const index = { value: 0 };
  walk(dom, patches, index);
}

function walk(node, patches, index) {
  const currentPatches = patches[index.value];
  if (currentPatches) {
    applyPatches(node, currentPatches);
  }

  const childNodes = node.childNodes || [];
  childNodes.forEach(child => {
    index.value++;
    walk(child, patches, index);
  });
}

function applyPatches(node, patches) {
  patches.forEach(patch => {
    switch (patch.type) {
      case "REMOVE":
        node.parentNode.removeChild(node);
        break;
      case "ADD":
        const newNode = createElement(patch.newNode);
        node.appendChild(newNode);
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
          if (patch.propPatches[key] === null) {
            node.removeAttribute(key);
          } else {
            node[key] = patch.propPatches[key];
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
    if (prop !== "children") {
      element[prop] = vNode.props[prop];
    }
  }

  vNode.props.children.forEach(child => {
    element.appendChild(createElement(child));
  });

  return element;
}