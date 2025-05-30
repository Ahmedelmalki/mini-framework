import { addNode, setElClass } from "../framework/dom.js";
import { Router } from "../framework/router.js";
import { useState } from "../framework/state.js";
import { PageNotFound } from "../framework/notfound.js";

// Move vdom into a function to always get latest state
function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);
  let count = 1;
  const HandleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    let task = {
      id: count,
      name: formData.get("todo"),
      completed: false,
    };
    if (task.name.trim().length === 0) {
      e.target.reset();
      return;
    }
    setTodos(todos.push(task));
    e.target.reset();
    let todoItem = todos.map((el) => {
      return addNode(
        "div",
        {
          class: "todo-item",
          id: `id_${el.id}`,
        },
        [
          addNode("input", {
            type: "checkbox",
            id: `id_${el.id}_check`,
            onclick: () => {
              setTodos((e) =>
                e.id == el.id ? (e.completed = !e.completed) : e
              );
              el.completed = !el.completed;
              setElClass(
                `#id_${el.id}`,
                el.completed ? "todo-item completed" : "todo-item active"
              );
            },
          }),
          addNode(
            "label",
            {
              for: `id_${el.id}_check`,
            },
            [addNode("span", { class: "todo-text" }, [el.name])]
          ),
        ]
      );
    });

    setData(todoItem);
    count++;
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
      addNode("div", { class: "todo-card-footer" }, [
        addNode("a", { href: "/" }, ["All"]),
        addNode("a", { href: "/completed" }, ["Completed"]),
        addNode("a", { href: "/active" }, ["Active"]),
        addNode("a", { href: "/clear" }, ["Clear Completed"]),
      ]),
    ],
  };
}

const router = new Router({
  "/": App,
  "/completed": App,
  "/active": App,
  "/clear": App,
  "/404page": PageNotFound,
});

export { router };
