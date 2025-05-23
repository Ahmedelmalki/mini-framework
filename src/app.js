import { ourFrame } from "../framework/dom.js";
import { state } from "../framework/state.js";
import { route } from "../framework/route.js";

export default function App() {
  state.resetCursor(); // Reset before each re-render
  
  const [todos, setTodos] = state.useState([]);
  const [inputValue, setInput] = state.useState("");
  const itemsLeft = todos.filter((todo) => !todo.completed).length;

  const addTodo = () => {
    if (!inputValue.trim()) return;
    setTodos([...todos, { text: inputValue.trim(), completed: false }]);
    setInput("");
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const location = route.useLocation();
  const navigate = route.useNavigate();
  const currentPath = location;
  let filter = "all";
  if (currentPath === "/active") filter = "active";
  else if (currentPath === "/completed") filter = "completed";

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


  const toggleTodo = idx => {
    const updated = todos.slice();
    updated[idx].completed = !updated[idx].completed;
    setTodos(updated);
  };


  return ourFrame.createElement(
    "div",
    null,
     //Header(),
    EnterTodos({inputValue, setInput, onAdd: addTodo}),
    TodoList({ todos: filterTodos, onToggle: toggleTodo }),
    Controls({
      itemsLeft,
      currentFilter: filter,
      onNavigate: navigate,
      onClear: clearCompleted,
    }),
  ); // end App
}

function EnterTodos({inputValue, setInput, onAdd}){
   return ourFrame.createElement(
    "section",
    { className: "enterTodos" },
    ourFrame.createElement("input", {
      type: "text",
      value: inputValue,
      placeholder: "enter a todo",
      onInput: e => setInput(e.target.value),
    }),
    ourFrame.createElement(
      "button",
      { className: "add-btn", onClick: onAdd },
      "add +"
    )
  );
}

function TodoList({todos, onToggle}){
  return ourFrame.createElement(
    "section",
    { className: "todos" },
    ourFrame.createElement(
      "ul",
      null,
      ...todos.map((todo, idx) =>
        ourFrame.createElement(
          "li",
          null,
          ourFrame.createElement(
            "label",
            null,
            ourFrame.createElement("input", {
              type: "checkbox",
              checked: todo.completed,
              onChange: () => onToggle(idx),
            }),
            " ",
            todo.text
          )
        )
      )
    )
  );
}

function Controls({itemsLeft, currentFilter, onNavigate, onClear}){
  const btn = (label, path) =>
    ourFrame.createElement(
      "button",
      {
        className: currentFilter === path ? "active-filter" : "",
        onClick: () => onNavigate(path),
      },
      label
    );

  return ourFrame.createElement(
    "section",
    { className: "btns-section" },
    ourFrame.createElement("span", null, `${itemsLeft} items left\t`),
    btn("All", "/"),
    btn("Active", "/active"),
    btn("Completed", "/completed"),
    ourFrame.createElement(
      "button",
      { onClick: onClear },
      "Clear completed"
    )
  );
}
