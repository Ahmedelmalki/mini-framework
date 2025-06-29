import { ourFrame } from "../../framework/dom.js";

export function renderForm(inputValue, setInput, addTodo) {
  return ourFrame.createElement(
    "header", // top 1
    { class: "header", "data-testid": "header" },
    ourFrame.createElement("h1", null, "todos"), // top 2
    ourFrame.createElement(
      "div", // TOP 3
      {
        class: "input-container",
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            addTodo();
          }
        },
      },
      ourFrame.createElement("input", {
        class: "new-todo",
        type: "text",
        value: inputValue,
        placeholder: "What needs to be done?",
        onInput: (e) => setInput(e.target.value),
      }),
      ourFrame.createElement(
        "label",
        { class: "visually-hidden", for: "todo-input" },
        "New Todo Input"
      )
    )
    // {
    //   class: "input-container",
    //   onSubmit: (e) => {
    //     e.preventDefault();
    //   },
    // }

    // ############################
    // ourFrame.createElement("button", { class: "add-btn", type: "submit" }, "create")
  );
}
