import { ourFrame } from "../signals/dom.js";
import { createEffect, createSignal } from "../signals/signal.js";
import { renderFilters, renderForm, renderTodos } from "./components.js";

export default function App() {
  // Create signals
  const [todos, setTodos] = createSignal([]);
  const [inputValue, setInput] = createSignal("");
  const [filter, setFilter] = createSignal("all");
  console.log(todos());
  

  // Computed values using signals
  const nextId = () => {
    const currentTodos = todos();
    return currentTodos.length > 0 
      ? currentTodos[currentTodos.length - 1].id + 1 
      : 1;
  };

  const itemsLeft = () => todos().filter(todo => !todo.completed).length;

  const filteredTodos = () => {
    const currentFilter = filter();
    const currentTodos = todos();
    
    if (currentFilter === "active") return currentTodos.filter(todo => !todo.completed);
    if (currentFilter === "completed") return currentTodos.filter(todo => todo.completed);
    return currentTodos;
  };

  // Event handlers
  const addTodo = () => {
    const value = inputValue().trim();
    if (!value) return;
    
    setTodos([...todos(), { 
      id: nextId(),
      text: value, 
      completed: false 
    }]);
    setInput("");
  };

  const toggleTodo = (id) => {
    setTodos(todos().map(todo => 
      todo.id === id 
        ? { ...todo, completed: !todo.completed }
        : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos().filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos().filter(todo => !todo.completed));
  };

  // Update filter based on route
  createEffect(() => {
    const path = window.location.pathname;
    if (path === "/active") setFilter("active");
    else if (path === "/completed") setFilter("completed");
    else setFilter("all");
  });

  return ourFrame.createElement(
    "div",
    { class: "todos-section" },
    ourFrame.createElement("h1", { class: "title" }, "todos"),
    renderForm(inputValue, setInput, addTodo),
    renderTodos(filteredTodos, toggleTodo, deleteTodo),
    renderFilters(itemsLeft, filter, clearCompleted)
  );
}