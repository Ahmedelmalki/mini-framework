/******************** element creation and event handling *****************/
export function diff(oldTree, newTree){
  return function applyPatches(dom){
    if (!oldTree){
      return dom.appendChild(createElement(newTree))
    }

    if (!newTree){
      return dom.parentNode.removeChild(dom)
    }

    if (oldTree.type !== newTree.type){
      return dom.parentNode.replaceChild(createElement(newTree), dom)
    }

    if (newTree.type === "TEXT_ELEMENT"){
      if (oldTree.props.nodeValue !== newTree.props.nodeValue){
        dom.nodeValue = newTree.props.nodeValue;
      }
      return;
    }

    // update properties
    updateProps(dom, oldTree.props, newTree.props)

    const oldChildren = oldTree.props.children || [];
    const newChildren = newTree.props.children || [];
    
    const maxLnt = Math.max(oldChildren.length, newChildren.length);
    for (let i = 0; i < maxLnt; i++){
      if (i < oldChildren.length && i < newChildren.length){ // update existing child
        diff(oldChildren[i], newChildren[i])(dom.childNodes[i])
      } else if (i < newChildren.length){ 
        dom.appendChild(createElement(newChildren[i])) // add new child
      } else if (i < oldChildren.length ){ 
        dom.removeChild(dom.childNodes[i]) // remove old child
      }
    }
  }
}

function updateProps(dom, oldProps, newProps){
  for (const key in newProps){
    if (key === "children") continue;

    if (oldProps[key] !== newProps[key]){
      if (key.startsWith('on') && typeof newProps[key] === "function"){
        const eventType = key.toLowerCase().substring(2);
        if (oldProps[key]){
          dom.removeEventListener(eventType, oldProps[key]);
        }
        dom.addEventListener(eventType, newProps[key])
      } else if (key === 'value' || key === 'checked'){
        dom[key] = newProps[key];
      } else {
        dom.setAttribute(key, newProps[key]);
      }
    }
  }

  for (const key in oldProps){
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
  (vNode.props.children || []).forEach(child => {
    element.appendChild(createElement(child));
  });
  
  return element;
}



export function patch(container, oldTree, newTree) {
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
      children: children.map(child => 
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

/********************* state managment logic ******************/
let states = [];
let stateCursor = 0;
let rerenderFn = null;

function useState(initialValue) { 
  const currentIndex = stateCursor;
  states[currentIndex] =
  states[currentIndex] !== undefined ? states[currentIndex] : initialValue;

  function setState(newValue) {
    console.log("newValue ==>", newValue);
    states[currentIndex] = newValue;
    if (rerenderFn) rerenderFn();
  }

  stateCursor++; // Move to next state index
  return [states[currentIndex], setState];
}

function resetCursor() {
  stateCursor = 0;
}

export function injectRerender(fn) { 
  rerenderFn = fn;
}

// grouping funcs 
export const ourFrame = { 
  createElement: createVElement,
  render,
  patch,
  useState,
  resetCursor,
};
