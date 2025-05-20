
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
  // const prevState = [...currentState];

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
  }

  // Update old VDOM reference
  oldVDOM = newVDOM;

  // Restore state values
  // currentState = prevState;
  console.log('After rerender state:', currentState);
  console.log('=== Rerender End ===\n');
}
function useState(initialValue) {
  const localIndex = stateIndex;
  currentState[localIndex] = currentState[localIndex] !== undefined ? currentState[localIndex] : initialValue;

  function setState(newValue) {
    const nextValue = typeof newValue === 'function'
      ? newValue(currentState[localIndex])
      : newValue;
    console.log(`setState called: current=${currentState[localIndex]}, new=${nextValue}`);
    if (currentState[localIndex] === nextValue) {
      return; // Don't rerender if value hasn't changed
    }
    currentState[localIndex] = nextValue;
    rerender();
  }

  stateIndex++;
  return [currentState[localIndex], setState];
}


function createElement(type, attrs, ...children) {
  if (!type) {
    return
  }
  return {
    type,
    props: {
      ...attrs,
      children: children.map(child => {
        return typeof child === "object"
          ? child
          : createTextElement(child)
      }
      ).filter(child => child !== null && child !== undefined),
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
        // const handlerProp = "__" + eventType + "Handler";
        dom.addEventListener(eventType, element.props[name]);
        dom[eventType] = element.props[name];
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
  const handleClick = () => {
    console.log("Button clicked");
    setCount(prev => prev + 1);
  };
  return (ourFrame.createElement(
    "div",
    null,
    ourFrame.createElement("h1", null, "Count: " + count),
    ourFrame.createElement(
      "button",
      {
        onclick: handleClick
      },
      "Increment"
    ),
    count > 5
      ? ourFrame.createElement("h2", null, "Count is greater than 5")
      : null,
  )
  )
}



// Initial render with VDOM tracking
oldVDOM = App();
console.log("old", oldVDOM);

ourFrame.render(oldVDOM, container);