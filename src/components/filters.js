import router from "../main.js";
import { ourFrame } from "../../framework/dom.js";

export function renderFilters(itemsLeft, filter, clearCompleted) {
  return ourFrame.createElement(
    "footer",
    { class: "footer" },
    ourFrame.createElement(
      "span",
      { class: "todo-count" },
      `${itemsLeft} items left\t`
    ),

    ourFrame.createElement(
      "ul",
      { class: "filters" },
      ourFrame.createElement(
        // from here
        "li",
        {
          class: filter === "all" ? "active-filter" : "",
          onClick: () => router.navigate("/"),
        },
        "All\t"
      ),
      ourFrame.createElement(
        "li",
        {
          class: filter === "active" ? "active-filter" : "",
          onClick: () => router.navigate("/active"),
        },
        "Active\t"
      ),
      ourFrame.createElement(
        "li",
        {
          class: filter === "completed" ? "active-filter" : "",
          onClick: () => router.navigate("/completed"),
        },
        "Completed\t"
      ) // to here
    ),
    ourFrame.createElement(
      // later
      "button",
      { class: "clear-completed", onClick: clearCompleted },
      "Clear completed"
    )
  );
}
