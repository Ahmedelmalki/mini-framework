
import { diff } from "./vdom/diff.js";
import { patch } from "./vdom/patch.js";

const container = document.getElementById("root")

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

const element = ourFrame.createElement(
  "div",
  { id: "foo" },
  ourFrame.createElement("a", null, "bar"),
  ourFrame.createElement("b")
)

ourFrame.render(element, container)


