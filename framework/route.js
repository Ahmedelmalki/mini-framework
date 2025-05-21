import { state } from "./state.js";
import { effect } from "./effect.js";

/***************** routing logic ****************/
function useLocation() {
  const [loc, setLoc] = state.useState(window.location.pathname);
  // console.log('window.location ==>', window.location);

  effect.useEffect(() => {
    function update() {
      setLoc(window.location.pathname);
    }
    // Fix: Listen to both popstate and our custom navigation event
    window.addEventListener("popstate", update);
    window.addEventListener("navigation", update);

    return () => {
      window.removeEventListener("popstate", update);
      window.removeEventListener("navigation", update);
    };
  }, []);

  return loc;
}

function useNavigate() {
  return (to) => {
    if (window.location.pathname !== to) {
      // Only navigate if the current path is different
      window.history.pushState(null, "", to);
      
      const navigationEvent = new CustomEvent("navigation", { detail: { path: to } });
      window.dispatchEvent(navigationEvent);
      
      const popstateEvent = new PopStateEvent("popstate"); // Create and dispatch popstate event manually
      window.dispatchEvent(popstateEvent);
    }
  };
}
export const route = {
  useLocation,
  useNavigate,
};
