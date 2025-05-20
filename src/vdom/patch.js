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
        if (node.nodeType === Node.TEXT_NODE) {
          node.nodeValue = patch.newNode.props.nodeValue;
        } else {
          node.textContent = patch.newNode.props.nodeValue;
        }
        break;
      case "PROPS":
        for (const key in patch.propPatches) {
          if (key === "children") continue;
          const value = patch.propPatches[key];
          if (value === null) {
            if (key.startsWith("on")) {
              const eventType = key.slice(2).toLowerCase();
              if (node[key]) node.removeEventListener(eventType, node[key]);
              node[key] = null;
            } else if (key === "class" || key === "className") {
              node.removeAttribute("class");
            } else {
              node.removeAttribute(key);
            }
          } else {
            if (key.startsWith("on")) {
              const eventType = key.slice(2).toLowerCase();
              if (node[key]) node.removeEventListener(eventType, node[key]);
              node.addEventListener(eventType, value);
              node[key] = value;
            } else if (key === "class" || key === "className") {
              node.className = value;
            } else {
              node.setAttribute(key, value);
            }
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
      const eventType = prop.slice(2).toLowerCase();
      element.addEventListener(eventType, value);
      element[prop] = value;
    } else if (prop === "class" || prop === "className") {
      element.className = value;
    } else {
      element.setAttribute(prop, value);
    }
  }

  vNode.props.children.forEach(child => {
    element.appendChild(createElement(child));
  });

  return element;
}