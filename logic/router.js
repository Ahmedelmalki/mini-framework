let routes = {};

export function defineRoutes(routeMap) {
  routes = routeMap;
  window.addEventListener("hashchange", renderRoute);
  renderRoute();
}

function renderRoute() {
  const path = location.hash.slice(1) || "/";
  const view = routes[path] || routes["/404"];
  document.getElementById("app").innerHTML = "";
  view();
}
