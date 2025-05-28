import { addNode } from "../framework/dom.js";
import { Router } from "../framework/router.js";
import { useState } from "../framework/state.js";
import { PageNotFound } from "../framework/notfound.js";

// Move vdom into a function to always get latest state
function App() {
  const [task, setTask] = useState("hello");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setTask(formdata.get("task"));
  };
  let [count, setCount] = useState(0);
  return {
    type: "div",
    props: { class: "content" },
    children: [
      addNode("h1", { class: "title" }, ["Todos"]),
      addNode("div", { class: "todo-card" }, [
        addNode("div", { class: "todo-list" }, [`task is: ${task}`]),
        addNode("form", { onsubmit: handleSubmit }, [
          addNode(
            "input",
            {
              placeholder: "add todo...",
              class: "todo-input",
              name: "task",
              type: "text",
            },
            []
          ),
          addNode(
            "button",
            {
              class: "add-btn",
              type: "submit",
            },
            ["ADD"]
          ),
        ]),
        addNode("div", {}, [
          addNode("div", { class: "counter" }, [`${count}`]),
          addNode(
            "button",
            {
              class: "btn-primary",
              onclick: () => {
                setCount(count += 1);
              },
            },
            ["increment"]
          ),
        ]),
      ]),
    ],
  };
}

const router = new Router({
  "/": App,
  "/404page": PageNotFound
});

export { router };

