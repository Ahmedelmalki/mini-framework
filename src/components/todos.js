import { ourFrame } from "../../framework/dom.js";

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
            ),
            ourFrame.createElement(
              "button",
              {
                class: "delete-btn",
                onClick: () => deleteTodo(todo.id),
              },
              "×"
            )
          )
        )
      )
    )
  );
}
