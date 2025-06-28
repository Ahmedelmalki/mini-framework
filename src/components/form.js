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
    ourFrame.createElement(
      "div",
      { class: "toggle-all-container" },
      ourFrame.createElement(
        "input",
        { class: "toggle-all", type: "checkbox", id: "toggle-all" },
        ourFrame.createElement("label", { class: "toggle-all-label",
          for: "toggle-all"
         },
          "Toggle All Input")
      )
    ),
    ourFrame.createElement("input", {
      class: "new-todo",
      type: "text",
      value: inputValue,
      placeholder: "What needs to be done?",
      onInput: (e) => setInput(e.target.value),
    })
    // ourFrame.createElement("button", { class: "add-btn", type: "submit" }, "create")
  );
}
