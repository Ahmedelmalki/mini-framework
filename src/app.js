import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";
import { renderFilters } from "./components/filters.js";
import { renderForm } from "./components/form.js";
import { renderTodos } from "./components/todos.js";

export default function App() {
  state.resetCursor();

  const [todos, setTodos] = state.useState([]);
  const [inputValue, setInput] = state.useState("");
  const id = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1;

  const currentPath = window.location.pathname;
  let filter = "all";
  if (currentPath === "/active") filter = "active";
  else if (currentPath === "/completed") filter = "completed";

  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([
      ...todos,
      { text: inputValue.trim(), completed: false, id: id, editing: false },
    ]); // add flag for if the user is editing
    setInput("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const toggleTodo = (idx) => {
    setTodos(
      todos.map((el) => {
        if (el.id === idx) {
          return { ...el, completed: !el.completed };
        }
        return el;
      })
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const deleteTodo = (idx) => {
    setTodos(todos.filter((el) => el.id !== idx));
  };

  // add : startEditing and finish
  const startEditing = (id) => {
    console.log('invoked   0000000000000000000000');
    
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, editing: true } : todo))
    );
  };

  const finishEditing = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, text: newText.trim() || todo.text, editing: false }
          : todo
      )
    );
  };

  return ourFrame.createElement(
    "section",
    { class: "todoapp", id: "root" },
    ourFrame.createElement(
      "header",
      { class: "header" },
      ourFrame.createElement("h1", null, "todos"),
      renderForm(inputValue, setInput, addTodo)
    ),
    ourFrame.createElement(
      "main",
      { class: "main" },
      renderTodos(filteredTodos, toggleTodo, deleteTodo, startEditing, finishEditing)
    ),
    renderFilters(itemsLeft, filter, clearCompleted)
  );
}
