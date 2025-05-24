
import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";
import router from './main.js';

export default function App() {
  state.resetCursor(); // Reset before each re-render

  const [todos, setTodos] = state.useState([]);
  const [inputValue, setInput] = state.useState("");
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  // Get current path from window.location
  const currentPath = window.location.pathname;
  let filter = "all";
  if (currentPath === "/active") filter = "active";
  else if (currentPath === "/completed") filter = "completed";

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    setInput("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filterTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

  const toggleTodo = idx => {
    const updated = todos.slice();
    updated[idx].completed = !updated[idx].completed;
    setTodos(updated);
  };

  return ourFrame.createElement(
    "div",
    { class: "todos-section" },
    ourFrame.createElement("h1", { class: "title" }, "todos"),
    ourFrame.createElement(
      "form",
      {
        class: "enterTodos", onSubmit: (e) => {
          e.preventDefault(); // Prevent form submission
          addTodo();
        }
      },

      ourFrame.createElement("input", {
        type: "text",
        value: inputValue,
        placeholder: "enter a todo",
        onInput: (e) => setInput(e.target.value),
      }),
      ourFrame.createElement(
        "button",
        { class: "add-btn", type: "submit" },
        "create"
      )
    ),
    ourFrame.createElement(
      "section",
      { class: "todos" },
      ourFrame.createElement(
        "ul",
        null,
        ...filterTodos.map((todo, index) =>
          ourFrame.createElement(
            "li",
            null,
            ourFrame.createElement(
              "label",
              null,
              ourFrame.createElement("input", {
                type: "checkbox",
                checked: todo.completed,
                onChange: () => toggleTodo(index),
              }),
              " ",
              ourFrame.createElement("span",
                { class: todo.completed ? "completed" : "" },
                todo.text
              )
            )
          )
        )
      )
    ),
    ourFrame.createElement(
      "section",
      { class: "btns-section" },
      ourFrame.createElement("span", null, `${itemsLeft} items left\t`),
      ourFrame.createElement(
        "button",
        {
          class: filter === "all" ? "active-filter" : "",
          onClick: () => router.navigate("/"),
        },
        "All"
      ),
      ourFrame.createElement(
        "button",
        {
          class: filter === "active" ? "active-filter" : "",
          onClick: () => router.navigate("/active"),
        },
        "Active"
      ),
      ourFrame.createElement(
        "button",
        {
          class: filter === "completed" ? "active-filter" : "",
          onClick: () => router.navigate("/completed"),
        },
        "Completed"
      ),
      ourFrame.createElement(
        "button",
        { onClick: clearCompleted },
        "Clear completed"
      )
    )
  );
}

