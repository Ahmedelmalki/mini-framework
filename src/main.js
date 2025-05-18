import { ourFrame } from "./vdom/framework.js";

const container = document.getElementById("root");

//let inputValue = "";
// let todos = [];
let currentApp = null; // Keep track of the current app state/virtual DOM

let states = [];
let stateCursor = 0;

function useState(initialValue) {
  // todo: move this to mf file
  const currentIndex = stateCursor;
  states[currentIndex] =
    states[currentIndex] !== undefined ? states[currentIndex] : initialValue;

  function setState(newValue) {
    console.log("newValue ==>", newValue);
    states[currentIndex] = newValue;
    rerender(); // Trigger UI re-render
  }

  stateCursor++; // Move to next state index
  return [states[currentIndex], setState];
}

function App() {
  stateCursor = 0; // Reset before each re-render
  const [todos, setTodos] = useState([]);
  const [itemsLeft, setItemsLeft] = useState(todos.length);
  const [inputValue, setInput] = useState("");

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
      ourFrame.createElement("span", null, `${itemsLeft} items left`), // end items count
      ourFrame.createElement("button", null, "all"), // end all button
      ourFrame.createElement("button", null, "active"), // end active button
      ourFrame.createElement("button", null, "completed"), // end completed
      ourFrame.createElement("button", null, "clear completed") // end clear completed
    ) // end buttons section
  ); // end App
}

// Initial render
function initialRender() {
  currentApp = App();
  ourFrame.render(currentApp, container);
}

// Re-render using improved diff/patch
function rerender() {
  const newApp = App();
  ourFrame.patch(container, currentApp, newApp);
  currentApp = newApp;
}

// Initialize the app
initialRender();

// todo routing system
