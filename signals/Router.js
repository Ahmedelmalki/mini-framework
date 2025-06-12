import { ourFrame } from "./dom.js";
import { createSignal, createEffect } from "./signal.js";

export class Router {
  constructor(routes) {
    // Create signals for route state
    const [currentPath, setCurrentPath] = createSignal(window.location.pathname);
    this.currentPath = currentPath;
    this.setCurrentPath = setCurrentPath;
    
    this.routes = routes;
    this.rootElement = document.getElementById("root");
    
    // Initialize router
    this.init();
    
    // Create effect for route rendering
    createEffect(() => {
      const path = this.currentPath();
      const route = this.matchRoute(path);
      
      if (route) {
        const Component = route.component;
        const element = Component();
        
        // Clear and update root element
        while (this.rootElement.firstChild) {
          this.rootElement.removeChild(this.rootElement.firstChild);
        }
        this.rootElement.appendChild(element);
      } else {
        // Handle 404
        this.navigate("/404", true);
      }
    });
  }

  init() {
    // Handle browser navigation
    window.addEventListener("popstate", () => {
      this.setCurrentPath(window.location.pathname);
    });
  }

  matchRoute(path) {
    if (this.routes[path]) {
      return { component: this.routes[path] };
    }
    return null;
  }

  navigate(to, replace = false) {
    if (this.currentPath() === to) return;

    if (replace) {
      window.history.replaceState(null, "", to);
    } else {
      window.history.pushState(null, "", to);
    }

    // Update current path signal
    this.setCurrentPath(to);
  }
}