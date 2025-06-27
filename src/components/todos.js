import { ourFrame } from "../../framework/dom.js";

export function renderTodos(
  filteredTodos,
  toggleTodo,
  deleteTodo,
  startEditing,
  finishEditing
) {
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
