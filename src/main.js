import { diff } from "./vdom/diff.js";
import { patch } from "./vdom/patch.js";
import { ourFrame } from "./vdom/diff.js";

const container = document.getElementById("root");

let inputValue = "";
let todos = [];
let currentApp = null; // Keep track of the current app state/virtual DOM

function App() {
  return ourFrame.createElement(
    "div",
    null,
    ourFrame.createElement("h1", null, "Todos"),
    ourFrame.createElement(
      "section",
      { className: "enterTodos" },
      ourFrame.createElement("input", {
        type: "text",
        value: inputValue,
        placeholder: "enter a todo",
        onInput: (e) => {
          inputValue = e.target.value;
        },
      }),
      ourFrame.createElement(
        "button",
        {
          className: "add-btn",
          onClick: () => {
            if (inputValue.trim()) {
              todos.push({ text: inputValue, completed: false });              
              inputValue = "";
              rerender(); // Re-render the UI with diff/patch
            }
          },
        },
        "add"
      )
    ), // end input section
    ourFrame.createElement(
      "section",
      { className: "todos" },
      ourFrame.createElement(
        "ul",
        null,
        ...todos.map((todo) =>
          ourFrame.createElement(
            "li",
            null,
            ourFrame.createElement("span", null, todo.text),
          )
        )
      )
    ) // end todos section
  );
}

// Initial render
function initialRender() {
  currentApp = App();
  ourFrame.render(currentApp, container);
}

// Re-render using diff/patch
function rerender() {  
  const newApp = App();
  const patches = diff(currentApp, newApp);
  patch(container, patches);
  currentApp = newApp; // Update the reference to current app
}

// Initialize the app
initialRender();
