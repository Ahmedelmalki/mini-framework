export function diff(oldTree, newTree) {
  const patches = [];
  walk(oldTree, newTree, patches, 0);
console.log("patches",patches);

  return patches;
}

function walk(oldNode, newNode, patches, index) {
  const patch = [];

  if (!newNode) {
    // Node removed
    patch.push({ type: "REMOVE", index });
  } else if (!oldNode) {
    // Node added
    patch.push({ type: "ADD", newNode });
  } else if (oldNode.type !== newNode.type) {
    // Node replaced
    patch.push({ type: "REPLACE", newNode });
  } else if (oldNode.type === "TEXT_ELEMENT" && oldNode.props.nodeValue !== newNode.props.nodeValue) {
    // Text content changed
    console.log("text",  newNode.props.nodeValue);
    
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
    if (key === 'children') continue;
    // Special handling for event handlers
    if (key.startsWith('on')) {
      patches[key] = newProps[key];
    } else if (newProps[key] !== oldProps[key]) {
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
  let currentIndex = index;

  // Filter out null children before diffing
  const filteredOldChildren = oldChildren.filter(child => child !== null);
  const filteredNewChildren = newChildren.filter(child => child !== null);

  for (let i = 0; i < Math.max(filteredOldChildren.length, filteredNewChildren.length); i++) {
    currentIndex += 1;
    walk(filteredOldChildren[i], filteredNewChildren[i], patches, currentIndex);
    if (filteredOldChildren[i]?.props?.children) {
      currentIndex += countDescendants(filteredOldChildren[i]);
    }
  }
}


function countDescendants(node) {
  if (!node || !node.props || !node.props.children) return 0;
  let count = 0;
  for (const child of node.props.children) {
    count += 1;
    count += countDescendants(child);
  }
  return count;
}