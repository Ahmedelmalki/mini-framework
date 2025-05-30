import { ourFrame } from "../framework/dom.js";
import router from "./main.js";

export function renderForm(inputValue, setInput, addTodo) {
  return ourFrame.createElement(
    "form",
    {
      class: "enterTodos",
      onSubmit: (e) => {
        e.preventDefault();
        addTodo();
      },
    },
    ourFrame.createElement("input", {
      type: "text",
      value: inputValue,
      placeholder: "enter a todo",
      onInput: (e) => setInput(e.target.value),
    }),
    ourFrame.createElement("button", { class: "add-btn", type: "submit" }, "create")
  );
}

export function renderTodos(filteredTodos, toggleTodo) {
  return ourFrame.createElement(
    "section",
    { class: "todos" },
    ourFrame.createElement(
      "ul",
      null,
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
              onChange: () => toggleTodo(index),
            }),
            " ",
            ourFrame.createElement(
              "span",
              { class: todo.completed ? "completed" : "" },
              todo.text
            )
          )
        )
      )
    )
  );
}

export function renderFilters(itemsLeft, filter, clearCompleted) {
  return ourFrame.createElement(
    "section",
    { class: "btns-section" },
    ourFrame.createElement("span", null, `${itemsLeft} items left\t`),
    ourFrame.createElement(
      "button",
      {
        class: filter === "all" ? "active-filter" : "",
        onClick: () => router.navigate("/"),
      },
      "All"
    ),
    ourFrame.createElement(
      "button",
      {
        class: filter === "active" ? "active-filter" : "",
        onClick: () => router.navigate("/active"),
      },
      "Active"
    ),
    ourFrame.createElement(
      "button",
      {
        class: filter === "completed" ? "active-filter" : "",
        onClick: () => router.navigate("/completed"),
      },
      "Completed"
    ),
    ourFrame.createElement(
      "button",
      { onClick: clearCompleted },
      "Clear completed"
    )
  );
}