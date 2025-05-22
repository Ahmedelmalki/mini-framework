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

  return ourFrame.createElement(
    "div",
    null,
    ourFrame.createElement("h1", null, ""),
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
        "add + "
      )
    ), // end input section
    ourFrame.createElement(
      "section",
      { className: "todos" },
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
                onChange: () => {
                  // Toggle completion status
                  const updated = [...todos];
                  updated[index].completed = !updated[index].completed;
                  setTodos(updated);
                },
              }),
              " ",
              todo.text
            )
          )
        )
      )
    ), // end todos section
    ourFrame.createElement(
      "section",
      { className: "btns-section" },
      ourFrame.createElement("span", null, `${itemsLeft} items left\t`),
      ourFrame.createElement(
        "button",
        {
          className: filter === "all" ? "active-filter" : "",
          onClick: () => navigate("/"),
        },
        "All"
      ),
      ourFrame.createElement(
        "button",
        {
           className: filter === "active" ? "active-filter" : "",
          onClick: () => navigate("/active"),
        },
        "Active"
      ),
      ourFrame.createElement(
        "button",
        {
          className: filter === "completed" ? "active-filter" : "",
          onClick: () => navigate("/completed"),
        },
        "Completed"
      ),
      ourFrame.createElement(
        "button",
        {
          onClick: () => {
            clearCompleted();
          },
        },
        "Clear completed"
      )
    ) // end buttons section
  ); // end App
}
