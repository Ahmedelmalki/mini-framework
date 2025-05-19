import { ourFrame } from "./vdom/framework.js";
import { state } from "./vdom/framework.js";
import { route } from "./vdom/framework.js";

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

  // link each button to its rout
  const location = route.useLocation();
  const navigate = route.useNavigate();
  console.log(location, navigate);

  const currentPath = location;
  let filter = "all";
  if (currentPath === "/active") filter = "active";
  else if (currentPath === "/completed") filter = "completed";

  const filterTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true; // all
  });

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
        ...filterTodos.map((todo) =>
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
      ourFrame.createElement(
        "button",
        {
          onClick: () => navigate("/"),
        },
        "all"
      ),
      ourFrame.createElement(
        "button",
        {
          onClick: () => navigate("/active"),
        },
        "active"
      ),
      ourFrame.createElement(
        "button",
        {
          onClick: () => navigate("/completed"),
        },
        "completed"
      ),
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
