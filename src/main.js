
import { diff } from "./vdom/diff.js";
import { patch } from "./vdom/patch.js";

const container = document.getElementById("root")

let currentState = [];
let stateIndex = 0;
let oldVDOM = null;


function rerender() {
  console.log('=== Rerender Start ===');
  console.log('Before state reset:', currentState);
  // Save current state values
  const prevState = [...currentState];
  
  // Reset state index before creating new VDOM
  stateIndex = 0;
  
  // Create new VDOM with current state
  const newVDOM = App();
   console.log('New VDOM:', newVDOM);

  // Generate and apply patches
  const patches = diff(oldVDOM, newVDOM);
  
  // Only patch if we have a firstChild
  if (container.firstChild) {
    patch(container.firstChild, patches);
  } else {
    // Initial render
    ourFrame.render(newVDOM, container);
  }
  
  // Update old VDOM reference
  oldVDOM = newVDOM;
  
  // Restore state values
  currentState = prevState;
  console.log('After rerender state:', currentState);
  console.log('=== Rerender End ===\n');
}
function useState(initialValue) {
  const localIndex = stateIndex;
  currentState[localIndex] = currentState[localIndex] !== undefined ? currentState[localIndex] : initialValue;

  function setState(newValue) {
    console.log(`setState called: current=${currentState[localIndex]}, new=${newValue}`);
    if (currentState[localIndex] !== newValue) {
      currentState[localIndex] = newValue;
      rerender();
    }
  }

  stateIndex++;
  return [currentState[localIndex], setState];
}


function createElement(type, attrs, ...children) {
  return {
    type,
    props: {
      ...attrs,
      children: children.map(child =>
        typeof child === "object"
          ? child
          : createTextElement(child)
      ),
    },
  }
}

function createTextElement(text) {
  return {
    type: "TEXT_ELEMENT",
    props: {
      nodeValue: text,
      children: [],
    },
  }
}

function render(element, container) {
  const dom =
    element.type == "TEXT_ELEMENT"
      ? document.createTextNode("")
      : document.createElement(element.type)
  const isProperty = key => key !== "children"
  Object.keys(element.props)
    .filter(isProperty)
    .forEach(name => {
      if (name.startsWith("on") && typeof element.props[name] === "function") {
        // Attach event listener
        const eventType = name.slice(2).toLowerCase();
        dom.addEventListener(eventType, element.props[name]);
      } else {
        dom[name] = element.props[name];
      }
    })

  element.props.children.forEach(child =>
    render(child, dom)
  )
  container.appendChild(dom)
}

const ourFrame = {
  createElement,
  render
}


function App() {
  const [count, setCount] = useState(0);

  return ourFrame.createElement(
    "div",
    null,
    ourFrame.createElement("h1", null, "Count: " + count),
    ourFrame.createElement(
      "button",
      {
        onclick: () => {
          setCount(count + 1); console.log("Button clicked");
        }
      },
      "Increment"
    )
  );
}



// Initial render with VDOM tracking
oldVDOM = App();
ourFrame.render(oldVDOM, container);