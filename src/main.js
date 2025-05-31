import { addNode, setElClass } from "../framework/dom.js";
import { Router } from "../framework/router.js";
import { useState } from "../framework/state.js";
import { PageNotFound } from "../framework/notfound.js";

// Move vdom into a function to always get latest state
function App() {
  const [todos, setTodos] = useState([]);
  const [data, setData] = useState([]);
  const [count1, setCount] = useState(0);

  // for (let i = 0; i < 5; i++) {
  //   setCount((prev) => prev + 1);
  // }
  let count = 1;
  const HandleSubmit = (e) => {
    e.preventDefault();

    setCount(1)
    setCount(2)

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

  const pathName = window.location.pathname
  console.log("Current Path:", pathName);

  console.log("Todos:", todos);
  console.log("Data:", data);

  console.log("Count:", count1);

  // if (pathName === "/completed") {

  // console.log("Todos:", todos);
  //   setData(
  //     todos.filter((el) => el.completed)
  //       .map((el) =>
  //         addNode(
  //           "div",
  //           {
  //             class: "todo-item completed",
  //             id: `id_${el.id}`,
  //           },
  //           [
  //             addNode("input", {
  //               type: "checkbox",
  //               id: `id_${el.id}_check`,
  //               checked: true,
  //               onclick: () => {
  //                 setTodos((e) =>
  //                   e.id == el.id ? (e.completed = !e.completed) : e
  //                 );
  //                 el.completed = !el.completed;
  //                 setElClass(
  //                   `#id_${el.id}`,
  //                   el.completed ? "todo-item completed" : "todo-item active"
  //                 );
  //               },
  //             }),
  //             addNode(
  //               "label",
  //               {
  //                 for: `id_${el.id}_check`,
  //               },
  //               [addNode("span", { class: "todo-text" }, [el.name])]
  //             ),
  //           ]
  //         )
  //       )
  //   );
  // }
  // if (pathName === "/active") {
  //   setData(
  //     todos
  //       .filter((el) => !el.completed)
  //       .map((el) =>
  //         addNode(
  //           "div",
  //           {
  //             class: "todo-item active",
  //             id: `id_${el.id}`,
  //           },
  //           [
  //             addNode("input", {
  //               type: "checkbox",
  //               id: `id_${el.id}_check`,
  //               onclick: () => {
  //                 setTodos((e) =>
  //                   e.id == el.id ? (e.completed = !e.completed) : e
  //                 );
  //                 el.completed = !el.completed;
  //                 setElClass(
  //                   `#id_${el.id}`,
  //                   el.completed ? "todo-item completed" : "todo-item active"
  //                 );
  //               },
  //             }),
  //             addNode(
  //               "label",
  //               {
  //                 for: `id_${el.id}_check`,
  //               },
  //               [addNode("span", { class: "todo-text" }, [el.name])]
  //             ),
  //           ]
  //         )
  //       )
  //   );
  // }
  // if (pathName === "/clear") {
  //   setTodos(todos.filter((el) => !el.completed));
  //   setData([]);
  // }
  const handleSomeEvent = () => {
    setCount(1);
    setCount(2);
    setCount(3)

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
            onsubmit: handleSomeEvent,
          },
          [
            addNode("input", {
              class: "todo-input",
              name: "todo",
              placeholder: "Create new task...",
            }),
            addNode("button", { class: "submit-btn"}, [
              "create",
            ]),
          ]
        ),
        addNode("div", { class: "todos-list" }, []),
      ]),
      // ...data,
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
