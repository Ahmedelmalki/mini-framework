

import App from "./app.js";
import { effect } from "../framework/effect.js";
import { initialRender, injectRootElement } from "../framework/helpers.js";

const container = document.getElementById("root"); // root node 
injectRootElement(container)


// Fix a3lal : Add cleanup on page unload
window.addEventListener("unload", () => {
  effect.cleanupEffects();
});

let AppFn = App();
console.log('====>', typeof AppFn);

initialRender(AppFn, container); // Initialize the app
