import { addNode, render, createDom } from "../framework/dom.js";

const vdom = {
  name: "main",
  attrs: {
    class: "container",
  },
  children: [
    addNode("h1",{class: "title",},["Hello World!"]),
    addNode("section",{class: "list"},
      [
        addNode("h2",{class: "title2"},
          [
            "hello in ",
            addNode("span",{ class: "blue" },["zone01!"]),
            addNode("span",{ class: "red" },["oujda"])
          ]
        ),
      ]
    ),
  ],
};

const main = createDom(vdom);

render(main, document.querySelector("#app"));
