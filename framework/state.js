let states = [];
let stateCursor = 0;
let rerenderFn = null;
let isRendering = false;  // Track if we're in the middle of rendering
let pendingStateUpdates = false;  // Flag for batching updates

function useState(initialValue) {
  const currentIndex = stateCursor;

  if (states[currentIndex] === undefined) {
    states[currentIndex] = initialValue;
  }

  const currentValue = states[currentIndex];

  function setState(newValue) {
    console.log("newValue ==>", newValue);
    
    const valueToSet = typeof newValue === "function" 
      ? newValue(states[currentIndex]) 
      : newValue;
    
    const hasChanged = states[currentIndex] !== valueToSet;
    
    if (hasChanged) {
      states[currentIndex] = valueToSet;
      
      if (typeof rerenderFn === "function") {
        if (isRendering) {
          // Schedule rerender for after current render completes (batch updates)
          pendingStateUpdates = true;
          setTimeout(() => {
            if (pendingStateUpdates) {
              pendingStateUpdates = false;
              rerenderFn();
            }
          }, 0);
        } else {
          rerenderFn();
        }
      } else {
        console.warn("rerender function is not defined");
      }
    }
  }

  stateCursor++; // Move to next state index
  return [currentValue, setState];
}

function resetCursor() {
  stateCursor = 0;
}

export function injectRerender(fn) {
  rerenderFn = fn;
}

// Fix: Zedna functions li kayt7akmo f rendering state
export function startRendering() {
  isRendering = true;
}

export function endRendering() {
  isRendering = false;
}

export const state = {
  useState,
  resetCursor,
  startRendering,
  endRendering,
};