import { ourFrame } from "../../framework/dom.js";

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