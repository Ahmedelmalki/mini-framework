const routes = {};

export function addRoute(path, view) {
  routes[path] = view;
}

export function navigate(path) {
  window.history.pushState({}, '', path);
  renderRoute(path);
}

function renderRoute(path) {
  const view = routes[path];
  if (typeof view === 'function') {
    const root = document.getElementById('app');
    root.innerHTML = '';
    root.appendChild(view({ path }));
  }
}

window.addEventListener('popstate', () => renderRoute(window.location.pathname));
