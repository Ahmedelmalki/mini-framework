import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";
import { renderFilters, renderForm, renderTodos } from "./components.js";
//import router from './main.js';

export default function App() {
  state.resetCursor();

  const [todos, setTodos] = state.useState([]);
  const [inputValue, setInput] = state.useState("");

  const currentPath = window.location.pathname;
  let filter = "all";
  if (currentPath === "/active") filter = "active";
  else if (currentPath === "/completed") filter = "completed";

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    setInput("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  const toggleTodo = (idx) => {
    const updated = todos.slice();
    updated[idx].completed = !updated[idx].completed;
    setTodos(updated);
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return ourFrame.createElement(
    "div",
    { class: "todos-section" },
    ourFrame.createElement("h1", { class: "title" }, "todos"),
    renderForm(inputValue, setInput, addTodo),
    renderTodos(filteredTodos, toggleTodo),
    renderFilters(itemsLeft, filter, clearCompleted)
  );
}


