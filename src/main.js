import { addNode } from "../framework/dom.js";
import { Router } from "../framework/router.js";
import { useState } from "../framework/state.js";
import { PageNotFound } from "../framework/notfound.js";

// Move vdom into a function to always get latest state
function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);
  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let task = {
      name: formData.get("todo"),
      type: "active",
    };
    setTodos(todos.push(task));
    e.target.reset();
    let todoItem = todos.map((el) =>
      addNode("div", { class: "todo-item" }, [
        addNode("label", {}, [
          addNode("input", { type: "checkbox" }),
          addNode("span", {class: "todo-text"}, [el.name]),
        ]),
      ])
    );
    setData(todoItem);
    console.log(todos);
  };

  return {
    type: "div",
    props: { class: "content" },
    children: [
      addNode("h1", { class: "title" }, ["Todos"]),
      addNode("div", { class: "todo-card" }, [
        addNode(
          "form",
          {
            class: "todo-form",
            method: "post",
            onsubmit: HandleSubmit,
          },
          [
            addNode("input", {
              class: "todo-input",
              name: "todo",
              placeholder: "Create new task...",
            }),
            addNode("button", { class: "submit-btn", type: "submit" }, [
              "create",
            ]),
          ]
        ),
        addNode("div", { class: "todos-list" }, []),
      ]),
      ...data,
    ],
  };
}

const router = new Router({
  "/": App,
  "/404page": PageNotFound,
});

export { router };
