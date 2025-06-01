import { router } from "../src/main.js"

let states = [];
let count = 0;
let isUpdating = false;
let pendingUpdates = new Set(); // Track which states need updates

const resetCount = () => count = 0;
const reset = () => {
  resetCount()
  pendingUpdates.clear();
  isUpdating = false;
}

function useState(initialState) {
  if (typeof states[count] == "undefined") {
    states[count] = initialState;
  }
  const index = count;
  console.log("initstate", states[index]);
  const setState = (newValue) => {
    console.log("nextState", newValue);

    const nextState = typeof newValue === "function"
      ? newValue(states[index])
      : newValue;

    if (states[index] !== nextState) {
      states[index] = nextState;
      // pendingUpdates.add(index);

      if (!isUpdating) {
        isUpdating = true;
        Promise.resolve().then(() => {
          // isUpdating = false;
          // if (pendingUpdates.size > 0) {
          // pendingUpdates.clear();
          router.rerender();
          // }
        });
      }
    }
  };

  count++;
  return [states[index], setState];
};



export { useState, reset };