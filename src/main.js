import { addNode, patch } from "../framework/dom.js";
import { useState, reset } from "../framework/state.js";

// Move vdom into a function to always get latest state
function App() {
  const [task, setTask] = useState("hello");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formdata = new FormData(e.target);
    setTask(formdata.get("task"));
    rerender(); // Trigger rerender after state update
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
                setCount((e) => e + 1);
              },
            },
            ["increment"]
          ),
        ]),
      ]),
    ],
  };
}

let oldDom = null;
const main = document.querySelector("#main");
export function rerender() {
  reset();
  const vdom = App(); // Always get fresh vdom with latest state
  patch(main, oldDom, vdom);
  oldDom = vdom;
}

rerender();

// initialRender(dom, main)
