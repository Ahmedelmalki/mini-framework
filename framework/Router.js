import { ourFrame } from "./dom.js";
import { effect } from "./effect.js";
import { state, injectRerender } from "./state.js";

export class Router {
  constructor(routes, rootElement) {
    this.routes = routes;
    this.rootElement = rootElement || document.getElementById("root");
    this.currentPath = window.location.hash || "#/";
    this.currentApp = null;
    this.init();
  }

  init() {
    injectRerender(this.rerender.bind(this));
    window.addEventListener("hashchange", () => this.handleNavigation());
    window.addEventListener("navigation", () => this.handleNavigation());
    this.handleNavigation();
  }

  handleNavigation() {
    this.currentPath = window.location.hash || "#/";
    const cleanPath = this.currentPath.replace(/^#/, ""); // remove '#'

    const route = this.matchRoute(cleanPath);

    if (route) {
      this.render(route.component);
    } else {
      this.navigate("/404", true); // fallback to not found
    }
  }

  matchRoute(path) {
    if (this.routes[path]) {
      return { component: this.routes[path] };
    }
    return null;
  }

  render(component) {
    state.startRendering();
    effect.resetEffects();
    state.resetCursor();

    const newApp = component();

    if (this.currentApp) {
      ourFrame.patch(this.rootElement, this.currentApp, newApp);
    } else {
      ourFrame.render(newApp, this.rootElement);
    }

    this.currentApp = newApp;

    state.endRendering();
  }

  rerender() {
    this.handleNavigation();
  }

  navigate(to, replace = false) {
    const targetHash = `#${to.replace(/^#/, "")}`; // make sure it starts with #

    if (window.location.hash === targetHash) return;

    if (replace) {
      window.location.replace(targetHash);
    } else {
      window.location.hash = targetHash;
    }

    // trigger navigation manually (optional, sometimes useful)
    window.dispatchEvent(new CustomEvent("navigation"));
  }
}
