import { ourFrame } from "../framework/dom.js";
import router from "./main.js";

export function renderForm(inputValue, setInput, addTodo) {
  return ourFrame.createElement(
    "form",
    {
      class: "input-container",
      onSubmit: (e) => {
        e.preventDefault();
        addTodo();
      },
    },
    ourFrame.createElement("input", {
      class: "new-todo",
      type: "text",
      value: inputValue,
      placeholder: "enter a todo",
      onInput: (e) => setInput(e.target.value),
    })
    // ourFrame.createElement("button", { class: "add-btn", type: "submit" }, "create")
  );
}

export function renderTodos(filteredTodos, toggleTodo, deleteTodo) {
  return ourFrame.createElement(
    "section",
    { class: "todos" },
    ourFrame.createElement(
      "ul",
      {
        class: "todo-list",
      },
      ...filteredTodos.map((todo, index) =>
        ourFrame.createElement(
          "li",
          null,
          ourFrame.createElement(
            "label",
            null,
            ourFrame.createElement("input", {
              type: "checkbox",
              checked: todo.completed,
              onChange: () => toggleTodo(todo.id),
            }),
            " ",
            ourFrame.createElement(
              "span",
              { class: todo.completed ? "completed" : "" },
              todo.text
            )
          )
          // ourFrame.createElement(
          //   "button",
          //   {
          //     class: "delete-btn",
          //     onClick: () => deleteTodo(todo.id),
          //   },
          //   "×"
          // )
        )
      )
    )
  );
}

export function renderFilters(itemsLeft, filter, clearCompleted) {
  return ourFrame.createElement(
    "footer",
    { class: "footer" },
    ourFrame.createElement(
      "span",
      { class: "todo-count" },
      `${itemsLeft} items left\t`
    ),

    ourFrame.createElement(
      "ul",
      { class: "filters" },
      ourFrame.createElement(
        // from here
        "li",
        {
          class: filter === "all" ? "active-filter" : "",
          onClick: () => router.navigate("/"),
        },
        "All"
      ),
      ourFrame.createElement(
        "li",
        {
          class: filter === "active" ? "active-filter" : "",
          onClick: () => router.navigate("/active"),
        },
        "Active"
      ),
      ourFrame.createElement(
        "li",
        {
          class: filter === "completed" ? "active-filter" : "",
          onClick: () => router.navigate("/completed"),
        },
        "Completed"
      ) // to here
    ),
    ourFrame.createElement(
      // later
      "button",
      { class: "clear-completed", onClick: clearCompleted },
      "Clear completed"
    )
  );
}
