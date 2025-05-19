import { state } from "./state.js";
import { effect } from "./effect.js";

/***************** routing logic ****************/
function useLocation() {
  const [loc, setLoc] = state.useState(window.location.pathname);

  effect.useEffect(() => {
    console.log("type ==>", typeof window.location);
    console.log(window.location);

    const update = () => setLoc(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return loc;
}

function useNavigate() {
  return (to) => {
    if (window.location.pathname !== to) { // Only navigate if the current path is different
      window.history.pushState(null, "", to);
      const popstateEvent = new PopStateEvent("popstate"); // Create and dispatch popstate event manually
      window.dispatchEvent(popstateEvent);
    }
  };
}
export const route = {
  useLocation,
  useNavigate,
};
