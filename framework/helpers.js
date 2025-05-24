import { ourFrame } from "./dom.js"
import { injectRerender , state} from "./state.js";
import { effect } from "./effect.js";
import App from "../src/app.js";

let currentApp = null; // Keep track of the current app state/virtual DOM
let root = null // same method we used to inject rerender

export function initialRender(AppFn, container) {  // {App fn}
  // nmarkiw bli renderinga
  state.startRendering();
  currentApp = AppFn; // hna kn3mro had lvariable b current dom tree bach ila tra shi tghyri kna9dro nmodifyiwo ghir f parts li tra fihom
  ourFrame.render(currentApp, container); // w hada hwa Initial render 
  state.endRendering();
}

injectRerender(rerender); 

function rerender() { 
  state.startRendering();
  effect.resetEffects();
  state.resetCursor();
  const newApp = App();  // <=== kifach npassi liha l app ??
  ourFrame.patch(root , currentApp, newApp);
  currentApp = newApp;
  state.endRendering();
}

export function injectRootElement(container){
    root = container;
}