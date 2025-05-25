import { rerender } from "../src/main.js";

let states = [];
let count = 0;

const resetCount = () => count = 0;

function useState(initialState) {
  
  if (typeof states[count] == "undefined") {
    states[count] = initialState;
  }
  const index = count;
  const state = states[index];
  const setState = (newValue) => {
    if (typeof newValue == "function") {
      states[index] = newValue(states[index])
    } else {
      states[index] = newValue;
    }
    console.log("new state is:", states[index], "state is =>" , states[index]);
    rerender()
  };
  count++;
  return [states[index], setState];
};



export { useState, resetCount };
