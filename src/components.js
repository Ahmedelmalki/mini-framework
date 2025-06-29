import { ourFrame } from "../framework/dom.js";
// import router from "./main.js";

export function renderForm(inputValue, setInput, addTodo, toggleAll, toggleAllChecked) {
  return ourFrame.createElement(
    "section",
    { class: "main" },
    ourFrame.createElement("input", {
      id: "toggle-all",
      class: "toggle-all",
      type: "checkbox",
      checked: toggleAllChecked,
      onclick: () => toggleAll(!toggleAllChecked),
    }),
    ourFrame.createElement("label", {
      for: "toggle-all",
    }),
    ourFrame.createElement(
      "form",
      {
        onSubmit: (e) => {
          e.preventDefault();
          addTodo();
        },
      },
      ourFrame.createElement("input", {
        class: "new-todo",
        type: "text",
        value: inputValue,
        placeholder: "What needs to be done?",
        autofocus: true,
        onInput: (e) => setInput(e.target.value),
      })
    )
  );
}


export function renderTodos(
  filteredTodos,
  toggleTodo,
  startEditing,
  saveEditing,
  editingIndex,
  todos,
  setTodos
) {
  const listItems = filteredTodos.map((todo, index) => {
    const children = [
      ourFrame.createElement(
        "div",
        { class: "view" },
        ourFrame.createElement("input", {
          type: "checkbox",
          class: "toggle",
          checked: todo.completed,
          onChange: () => toggleTodo(index),
        }),
        ourFrame.createElement(
          "label",
          {
            ondblclick: () => startEditing(index),
          },
          todo.text
        ),
        ourFrame.createElement("button", {
          class: "destroy",
          onclick: () => {
            const updated = todos.slice();
            updated.splice(index, 1);
            setTodos(updated);
          },
        })
      ),
      editingIndex === index
        ? ourFrame.createElement("input", {
          class: "edit",
          value: todo.text,
          autofocus: true,
          onblur: (e) => saveEditing(index, e.target.value),
          onkeydown: (e) => {
            if (e.key === "Enter") saveEditing(index, e.target.value);
            if (e.key === "Escape") saveEditing(index, null);
          },
        })
        : null,
    ].filter(Boolean); //  undefined / false

    return ourFrame.createElement(
      "li",
      {
        class:
          (todo.completed ? "completed " : "") +
          (editingIndex === index ? "editing" : ""),
      },
      ...children
    );
  });

  return ourFrame.createElement(
    "section",
    { class: "main" },
    ourFrame.createElement("ul", { class: "todo-list" }, ...listItems)
  );
}


//  FILTERS
export function renderFilters(itemsLeft, filter, clearCompleted) {
  return ourFrame.createElement(
    "footer",
    { class: "footer" },
    ourFrame.createElement(
      "span",
      { class: "todo-count" },
      ourFrame.createElement("strong", null, itemsLeft),
      ` item${itemsLeft !== 1 ? "s" : ""} left`
    ),
    ourFrame.createElement(
      "ul",
      { class: "filters" },
      ourFrame.createElement(
        "li",
        null,
        ourFrame.createElement(
          "a",
          {
            href: "#/",
            class: filter === "all" ? "selected" : "",
          },
          "All"
        )
      ),
      ourFrame.createElement(
        "li",
        null,
        ourFrame.createElement(
          "a",
          {
            href: "#/active",
            class: filter === "active" ? "selected" : "",
          },
          "Active"
        )
      ),
      ourFrame.createElement(
        "li",
        null,
        ourFrame.createElement(
          "a",
          {
            href: "#/completed",
            class: filter === "completed" ? "selected" : "",
          },
          "Completed"
        )
      )
    ),
    ourFrame.createElement(
      "button",
      {
        class: "clear-completed",
        onclick: clearCompleted,
      },
      "Clear completed"
    )
  );
}
