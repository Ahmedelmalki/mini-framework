

import { ourFrame } from "./vdom/framework.js";
const container = document.getElementById("root"); // root node 
let currentApp = null; // Keep track of the current app state/virtual DOM
import App from "./app.js";

// Initial render
function initialRender() {
  currentApp = App();
  ourFrame.render(currentApp, container);
}

import { injectRerender } from "./vdom/framework.js";
injectRerender(rerender); // difing this shit in the call stack

function rerender() { //here
  const newApp = App();
  ourFrame.patch(container, currentApp, newApp);
  currentApp = newApp;
}


// Initialize the app
initialRender();

