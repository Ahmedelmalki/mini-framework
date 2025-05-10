// let routes = {};

// export function defineRoutes(routeMap) {
//   routes = routeMap;
//   window.addEventListener("hashchange", renderRoute);
//   renderRoute();
// }

// function renderRoute() {
//   const path = location.hash.slice(1) || "/";
//   const view = routes[path] || routes["/404"];
//   document.getElementById("app").innerHTML = "";
//   view();
// }

// Simple routing system for our framework

import { render } from './dom.js';
import { useState, subscribe } from './state.js';

// Store routes and the current route
const routes = {};
const [getCurrentRoute, setCurrentRoute] = useState('currentRoute', {
  path: window.location.pathname,
  params: {}
});

/**
 * Register a route
 * @param {string} path - URL path 
 * @param {Function} component - Component to render when route matches
 */
export function route(path, component) {
  routes[path] = component;
}

/**
 * Initialize the router
 * @param {HTMLElement} container - DOM element to render components into
 */
export function initRouter(container) {
  // Initial render
  renderCurrentRoute(container);
  
  // Subscribe to route changes
  subscribe('currentRoute', () => renderCurrentRoute(container));
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', () => {
    navigateTo(window.location.pathname, false);
  });
  
  // Intercept link clicks for SPA-style navigation
  document.addEventListener('click', (e) => {
    const closestAnchor = e.target.closest('a');
    if (closestAnchor && closestAnchor.href && closestAnchor.href.startsWith(window.location.origin)) {
      e.preventDefault();
      navigateTo(new URL(closestAnchor.href).pathname);
    }
  });
}

/**
 * Navigate to a new route
 * @param {string} path - Path to navigate to
 * @param {boolean} addToHistory - Whether to add to browser history
 */
export function navigateTo(path, addToHistory = true) {
  // Parse path parameters
  const params = {};
  let matchedRoute = path;
  
  // Check for dynamic route matching (simple implementation)
  Object.keys(routes).forEach(routePath => {
    if (routePath.includes(':')) {
      const routeParts = routePath.split('/');
      const pathParts = path.split('/');
      
      if (routeParts.length === pathParts.length) {
        const potentialMatch = routeParts.every((part, i) => {
          if (part.startsWith(':')) {
            // Extract parameter
            params[part.substring(1)] = pathParts[i];
            return true;
          }
          return part === pathParts[i];
        });
        
        if (potentialMatch) {
          matchedRoute = routePath;
        }
      }
    }
  });
  
  setCurrentRoute({
    path,
    matchedRoute,
    params
  });
  
  if (addToHistory) {
    window.history.pushState(null, '', path);
  }
}

/**
 * Renders the current route's component
 * @param {HTMLElement} container - DOM element to render into
 */
function renderCurrentRoute(container) {
  const { matchedRoute, path, params } = getCurrentRoute();
  
  if (routes[matchedRoute]) {
    render(() => routes[matchedRoute](params), container);
  } else {
    // Handle 404
    render(() => ({
      tag: 'div',
      attrs: { class: 'not-found' },
      children: [`Route not found: ${path}`]
    }), container);
  }
}

/**
 * Creates a link component that works with the router
 * @param {string} to - Path to navigate to
 * @param {Object} attrs - HTML attributes
 * @param {Array} children - Child elements
 */
export function Link(to, attrs = {}, ...children) {
  return {
    tag: 'a',
    attrs: {
      ...attrs,
      href: to,
      onclick: (e) => {
        e.preventDefault();
        navigateTo(to);
      }
    },
    children
  };
}