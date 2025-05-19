import { createVNode, render, createDom } from "../framework/dom.js";

const vdom = {
  name: "main",
  attrs: {
    class: "container",
  },
  children: [
    createVNode(
      "h1",
      {
        class: "title",
      },
      ["Hello World!"]
    ),
    createVNode(
      "section",
      {
        class: "list",
      },
      [
        createVNode(
          "h2",
          {
            class: "title2",
          },
          [
            "hello in zone01!",
            {
              name: "span",
              attrs: { class: "red" },
              children: ["oujda"],
            },
          ]
        ),
      ]
    ),
  ],
};

const main = createDom(vdom);

render(main, document.querySelector("#app"));
