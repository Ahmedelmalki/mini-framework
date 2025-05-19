import { state } from "./state.js";
import { effect } from "./effect.js";

/***************** routing logic ****************/
function useLocation() {
  const [loc, setLoc] = state.useState(window.location.pathname);

  effect.useEffect(() => {
    const update = () => setLoc(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return loc;
}

function useNavigate() {
  return (to) => {
    window.history.pushState(null, "", to);
    dispatchEvent(new PopStateEvent("popstate"));
  };
}

export const route = {
  useLocation,
  useNavigate,
};