
import { h, mount } from '../logic/dom.js';
import { useState, subscribe } from '../logic/state.js';

export function TodoApp() {
  const [getTodos, setTodos] = useState("todos", []);
  const [getInput, setInput] = useState("input", "");

  const handleAdd = () => {
    if (getInput().trim() !== "") {
      setTodos([...getTodos(), getInput()]);
      setInput("");
    }
  };

  subscribe(render);

  function render() {
    document.getElementById("app").innerHTML = "";
    mount(AppView(), document.getElementById("app"));
  }

  function AppView() {
    return h("div", { class: "todo" },
      h("input", {
        type: "text",
        value: getInput(),
        oninput: (e) => setInput(e.target.value)
      }),
      h("button", { onclick: handleAdd }, "Add"),
      h("ul", {},
        ...getTodos().map(todo =>
          h("li", {}, todo)
        )
      )
    );
  }

  render();
}
