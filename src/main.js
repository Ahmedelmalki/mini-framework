
import { ourFrame } from "../framework/dom.js";
import App from "./app.js";
import { injectRerender , state} from "../framework/state.js";
import { effect } from "../framework/effect.js";

const container = document.getElementById("root"); // root node 
let currentApp = null; // Keep track of the current app state/virtual DOM

function initialRender() { // Initial render
  // nmarkiw bli renderinga
  state.startRendering();
  currentApp = App();
  ourFrame.render(currentApp, container);
  state.endRendering();
}

injectRerender(rerender); // difing this shit in the call stack

function rerender() { 
   state.startRendering();
  effect.resetEffects();
  state.resetCursor();

  const newApp = App();
  ourFrame.patch(container, currentApp, newApp);
  currentApp = newApp;
  state.endRendering();
}

// Fix a3lal : Add cleanup on page unload
window.addEventListener("unload", () => {
  effect.cleanupEffects();
});

initialRender(); // Initialize the app
