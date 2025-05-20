
import { ourFrame } from "../framework/dom.js";
import App from "./app.js";
import { injectRerender } from "../framework/state.js";

const container = document.getElementById("root"); // root node 
let currentApp = null; // Keep track of the current app state/virtual DOM

function initialRender() { // Initial render
  currentApp = App();
  ourFrame.render(currentApp, container);
}

injectRerender(rerender); // difing this shit in the call stack

function rerender() { 
  const newApp = App();
  ourFrame.patch(container, currentApp, newApp);
  currentApp = newApp;
}

initialRender(); // Initialize the app
