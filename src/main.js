// import { render } from "../logic/dom.js"; 
// import { TodoApp } from "./components.js";

// function App() {
//   return { // todo : make a parser tha pareses html to object
//     tag: "div",
//     attrs: { id: "app-root" },
//     children: [
//       "Hello, custom framework!",
//       {
//         tag: "button",
//         attrs: { onClick: () => alert("Button clicked!") },
//         children: ["Click me"]
//       }
//     ]
//   };
// }

// const container = document.getElementById("app");
// //render(App, container);
// render(TodoApp, container);

import { render, h } from "../logic/dom.js"; 
import { TodoApp } from "./components.js";
import { route, initRouter } from "../logic/router.js";

// Define example Home component
function Home() {
  return h("div", { class: "home" }, [
    h("h1", {}, "Welcome to My Mini-Framework"),
    h("p", {}, "This is a simple implementation of a JavaScript framework with:"),
    h("ul", {}, [
      h("li", {}, "Virtual DOM"),
      h("li", {}, "State Management"),
      h("li", {}, "Component-Based Architecture"),
      h("li", {}, "Routing")
    ]),
    h("button", { 
      onclick: () => alert("Button clicked!"),
      class: "demo-btn"
    }, "Click me"),
    h("p", {}, [
      h("a", { 
        href: "/todos",
        onclick: (e) => {
          e.preventDefault();
          window.history.pushState(null, '', "/todos");
          renderApp();
        }
      }, "Go to Todo App")
    ])
  ]);
}

// Setup routes
route("/", Home);
route("/todos", TodoApp);

// Main container
const container = document.getElementById("app");

// Initialize the app
function renderApp() {
  const path = window.location.pathname;
  
  if (path === "/todos") {
    render(TodoApp, container);
  } else {
    render(Home, container);
  }
}

// Start the app with routing
initRouter(container);

// Or without router, just render TodoApp directly
// render(TodoApp, container);