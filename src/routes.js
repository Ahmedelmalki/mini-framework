import App from "./app.js"; // Your main component
import NotFound from "./NotFound.js";
import Counter from "./counter.js";

export const routes = {
  "/": App,          // All todos
  "/active": App,    // Active todos
  "/completed": App, // Completed todos
  "/404": NotFound   // Optional: Add a 404 component
};