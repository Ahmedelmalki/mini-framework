import { render } from "../logic/dom.js"; 

function App() {
  return {
    tag: "div",
    attrs: { id: "app-root" },
    children: [
      "Hello, custom framework!",
      {
        tag: "button",
        attrs: { onClick: () => alert("Button clicked!") },
        children: ["Click me"]
      }
    ]
  };
}

const container = document.getElementById("app");
render(App, container);
