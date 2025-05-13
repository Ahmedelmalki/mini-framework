
import { diff } from "./vdom/diff.js";
import { patch } from "./vdom/patch.js";

const container = document.getElementById("root")

function createElement(type, props, ...children) {
  return {
    type,
    props: {
      ...props,
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
      dom[name] = element.props[name]
    })

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

const newElement = ourFrame.createElement(
  "div",
  { id: "foo" },
  ourFrame.createElement("a", null, "baz"),
  ourFrame.createElement("b"),
  // ourFrame.createElement("c")
);

console.log(element);

ourFrame.render(element, container)

const patches = diff(element, newElement);
patch(container, patches);