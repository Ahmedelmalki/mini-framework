import { ourFrame } from "../signals/dom.js";
import { createEffect } from "../signals/signal.js";
import router from "./main.js";

export function renderForm(inputValue, setInput, addTodo) {
  return ourFrame.createElement(
    "form",
    {
      class: "enterTodos",
      onsubmit: (e) => {
        e.preventDefault();
        addTodo();
      },
    },
    ourFrame.createElement("input", {
      type: "text",
      // value: () => inputValue(), // Make value reactive
      placeholder: "enter a todo",
      oninput: (e) => setInput(e.target.value),
      onMount: (form) => {
        createEffect(() => {
          form.value = inputValue();
        });
      }
    }),
    ourFrame.createElement(
      "button",
      { class: "add-btn", type: "submit" },
      "create"
    )
  );
}

export function renderTodos(getTodos, toggleTodo, deleteTodo) {
  return ourFrame.createElement(
    "section",
    { class: "todos" },
    ourFrame.createElement(
      "ul",
      {
        onMount: (ul) => createEffect(
          () => {
            ul.innerHTML = ''
            const todos = getTodos()
            console.log(todos);

            todos?.forEach(todo => {// Make list reactive
              const li = ourFrame.createElement(
                "li",
                { key: todo.id },
                ourFrame.createElement(
                  "label",
                  null,
                  ourFrame.createElement("input", {
                    type: "checkbox",
                    checked: todo.completed,
                    onchange: () => toggleTodo(todo.id),
                    onMount: (checkbox) => {
                      createEffect(() => {
                        checkbox.checked = todo.completed
                      })

                    }
                  }),
                  ourFrame.createElement(
                    "span",
                    {
                      class: () => todo.completed ? "completed" : "",
                      onMount: (span) => {
                        createEffect(() => {
                          span.className = todo.completed ? "completed" : "";
                        })
                      }
                    },
                    todo.text
                  )
                ),
                ourFrame.createElement(
                  "button",
                  {
                    class: "delete-btn",
                    onclick: () => deleteTodo(todo.id),
                  },
                  "×"
                )
              )
              ul.appendChild(li)
            })
          }
        )
      },
    )
  );
}

export function renderFilters(getItemsLeft, getFilter, clearCompleted) {
  return ourFrame.createElement(
    "section",
    { class: "btns-section" },
    ourFrame.createElement(
      "span",
      {
        onMount: (span) => {
          createEffect(
            () => span.textContent = `${getItemsLeft()} items left`
          )
        }
      },
      null
    ),
    ourFrame.createElement(
      "button",
      {
        class: () => getFilter() === "all" ? "active-filter" : "",
        onclick: () => router.navigate("/"),
      },
      "All"
    ),
    ourFrame.createElement(
      "button",
      {
        class: () => getFilter() === "active" ? "active-filter" : "",
        onclick: () => router.navigate("/active"),
      },
      "Active"
    ),
    ourFrame.createElement(
      "button",
      {
        class: () => getFilter() === "completed" ? "active-filter" : "",
        onclick: () => router.navigate("/completed"),
      },
      "Completed"
    ),
    ourFrame.createElement(
      "button",
      { onclick: clearCompleted },
      "Clear completed"
    )
  );
}