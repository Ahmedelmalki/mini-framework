

import { ourFrame } from "./vdom/framework.js";
const container = document.getElementById("root"); // root node 
let currentApp = null; // Keep track of the current app state/virtual DOM

function App() {
  ourFrame.resetCursor() // Reset before each re-render

  const [todos, setTodos] = ourFrame.useState([]);
  const [inputValue, setInput] = ourFrame.useState("");
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    setInput("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

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
          setInput(e.target.value);
        },
      }),
      ourFrame.createElement(
        "button",
        {
          className: "add-btn",
          onClick: () => {
            addTodo();
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
            ourFrame.createElement("span", null, todo.text)
          )
        )
      )
    ), // end todos section
    ourFrame.createElement(
      "section",
      { className: "btns-section" },
      ourFrame.createElement("span", null, `${itemsLeft} items left`),
      ourFrame.createElement("button", null, "all"),
      ourFrame.createElement("button", null, "active"),
      ourFrame.createElement("button", null, "completed"),
      ourFrame.createElement(
        "button",
        {
          onClick: () => {
            clearCompleted();
          },
        },
        "clear completed"
      )
    ) // end buttons section
  ); // end App
}

// Initial render
function initialRender() {
  currentApp = App();
  ourFrame.render(currentApp, container);
}

import { injectRerender } from "./vdom/framework.js";
injectRerender(rerender); // difing this shit in the call stack

function rerender() { //here
  const newApp = App();
  ourFrame.patch(container, currentApp, newApp);
  currentApp = newApp;
}


// Initialize the app
initialRender();

