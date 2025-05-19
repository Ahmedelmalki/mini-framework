/********************* state managment logic ******************/
let states = [];
let stateCursor = 0;
let rerenderFn = null;

function useState(initialValue) {
  const currentIndex = stateCursor;

  if (states[currentIndex] == undefined) {
    states[currentIndex] = initialValue;
  } // else matdir walo

  function setState(newValue) {
    console.log("newValue ==>", newValue);
    states[currentIndex] = newValue;
    if (rerenderFn) rerenderFn();
  }

  stateCursor++; // Move to next state index
  return [states[currentIndex], setState];
}

function resetCursor() {
  stateCursor = 0;
}

export function injectRerender(fn) {
  rerenderFn = fn;
}

export const state = {
  useState,
  resetCursor,
};