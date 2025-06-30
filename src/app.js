import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";
import { renderFilters, renderForm, renderTodos } from "./components.js";
//import router from './main.js';

export default function App() {
  state.resetCursor();

  // CHANGED HERE: added editingIndex and toggleAllChecked
  const [todos, setTodos] = state.useState([]);
  const [editingIndex, setEditingIndex] = state.useState(null); // index of task being edited
  const [toggleAllChecked, setToggleAllChecked] = state.useState(false); // toggle all state
  const [inputValue, setInput] = state.useState("");

  // UPDATED: routing logic - changed from pathname to hash
  const currentHash = window.location.hash;
  let filter = "all";
  if (currentHash === "#/active") filter = "active";
  else if (currentHash === "#/completed") filter = "completed";

  const itemsLeft = todos.filter(todo => !todo.completed).length;

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue.trim(), completed: false}]);
    setInput("");
  };

  // NEW: toggle all todos
  const toggleAll = (checked) => {
    setTodos(todos.map(todo => ({ ...todo, completed: checked })));
    setToggleAllChecked(checked);
  };

  // clear completed todos
  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.completed));
  };

  // toggle single todo
  const toggleTodo = (idx) => {
    const updated = todos.slice();
    updated[idx].completed = !updated[idx].completed;
    setTodos(updated);
  };

  // NEW: start editing
  const startEditing = (idx) => {
    setEditingIndex(idx);
  };

  // UPDATED: save edited text with better error handling
  const saveEditing = (idx, newText) => {
    if (newText === null) {
      setEditingIndex(null);
      return;
    }
    const updated = todos.slice();
    updated[idx].text = newText.trim() || updated[idx].text;
    setTodos(updated);
    setEditingIndex(null);
  };

  // apply filter to todos
  const filteredTodos = todos.filter(todo => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  // render with props passed to renderTodos
   return ourFrame.createElement(
    "div",
    { class: "todoapp" },
    ourFrame.createElement("h1", {}, "todos"),
    renderForm(inputValue, setInput, addTodo, toggleAll, toggleAllChecked),
    renderTodos(filteredTodos, toggleTodo, startEditing, saveEditing, editingIndex, todos, setTodos),
    todos.length > 0 ? renderFilters(itemsLeft, filter, clearCompleted) : null
  )
}