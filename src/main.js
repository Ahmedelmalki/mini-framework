
import { diff } from "./vdom/diff.js";
import { patch } from "./vdom/patch.js";

const container = document.getElementById("root")

let currentState = [];
let stateIndex = 0;
let oldVDOM = null;

function rerender() {
  stateIndex = 0;
  const newVDOM = App();
  const patches = diff(oldVDOM, newVDOM);
  patch(container.firstChild, patches);
  oldVDOM = newVDOM;
}

function useState(initialValue) {
  const localIndex = stateIndex;
  currentState[localIndex] = currentState[localIndex] !== undefined ? currentState[localIndex] : initialValue;
  
  function setState(newValue) {
    currentState[localIndex] = newValue;
    console.log("test");
    rerender();
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
  element.props.children.forEach(child =>
    render(child, dom)
  )
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

  container.appendChild(dom)
}

const ourFrame = {
  createElement,
  render
}

// function Header() {
//   return ourFrame.createElement(
//     "header",
//     { class: "header" },
//     ourFrame.createElement("h1", { class: "header" }, "todos")
//   );
// }

function App() {
  const [count, setCount] = useState(0);
// console.log(count);

  return ourFrame.createElement(
    "div",
    null,
    ourFrame.createElement("h1", null, "Count: " + count),
    ourFrame.createElement(
      "button",
      { onclick: () => setCount(count + 1) },
      "Increment"
    )
  );
}



// Initial render with VDOM tracking
oldVDOM = App();
ourFrame.render(oldVDOM, container);