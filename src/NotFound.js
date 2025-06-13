import { ourFrame } from '../signals/dom.js';
import  router  from './main.js';

export default function NotFound() {
  
  return ourFrame.createElement(
    "div",
    { class: "not-found-container" },
    ourFrame.createElement("h1", null, "404 - Page Not Found"),
    ourFrame.createElement(
      "p",
      null,
      "The page you're looking for doesn't exist."
    ),
    ourFrame.createElement(
      "button",
      {
        class: "home-btn",
        onClick: () => router.navigate("/") // Navigate back to home
      },
      "Return to Home"
    )
  );
}