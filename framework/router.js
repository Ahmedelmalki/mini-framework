import { patch } from "../framework/dom.js";
import { reset } from "../framework/state.js";
export class Router {
  constructor(paths) {
    this.paths = paths;
    this.oldDom = null;
    this.currentPath = window.location.pathname;
    this.init();
  }
  init() {
    this.navigate(this.currentPath);
    window.addEventListener("popstate", () => {
      this.navigate(window.location.pathname);
    });
    window.addEventListener("click", (e) => {
      if (e.target.tagName === "A") {
        e.preventDefault();
        const href = e.target.getAttribute("href");
        this.navigate(href);
      }
    });
  }
  navigate(pathName) {
    if (!this.paths.hasOwnProperty(pathName)) pathName = "/404page";

    if (window.history.length > 0) {
      window.history.pushState(null, null, pathName);
    } else {
      window.history.replaceState(null, null, pathName);
    }
    this.currentPath = pathName;
    this.rerender();
  }
  rerender() {
    reset();
    const main = document.querySelector("#main");
    const vdom = this.paths[this.currentPath](); // Always get fresh vdom with latest state
    patch(main, this.oldDom, vdom);
    this.oldDom = vdom;
  }
}
