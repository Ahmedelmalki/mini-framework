import { type } from "os";
import { ourFrame } from "../../framework/dom.js";

export function renderTodos(
  filteredTodos,
  toggleTodo,
  deleteTodo,
  startEditing,
  finishEditing
) {
  return ourFrame.createElement(
    "main",
    { class: "main", "data-testid": "main" },
    ourFrame.createElement(
      "div",
      { class: "toggle-all-container" },
      ourFrame.createElement("input", {
        class: "toggle-all",
        type: "checkbox",
        id: "toggle-all",
        "data-testid": "toggle-all",
      }),
      // ourFrame.createElement(
      //   "label",
      //   {
      //     class: "toggle-all-label",
      //     "for": "toggle-all",
      //   },
      //   "Toggle All Input"
      // )
    ),
    ourFrame.createElement(
      "ul",
      {
        class: "todo-list",
      },
      ...filteredTodos.map((todo, index) =>
        ourFrame.createElement(
          "li",
          null,
          todo.editing
            ? ourFrame.createElement("input", {
                type: "text",
                value: todo.text,
                autofocus: true,
                onBlur: (e) => finishEditing(todo.id, e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") {
                    finishEditing(todo.id, e.target.value);
                  }
                },
              })
            : ourFrame.createElement(
                "label",
                {
                  ondblclick: () => startEditing(todo.id),
                },
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
