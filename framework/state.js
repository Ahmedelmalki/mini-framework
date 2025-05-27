import { rerender } from "../src/main.js";

let states = [];
let count = 0;

const resetStates = () => [];
const resetCount = () => count = 0;
const reset = () => {
  resetCount()
  resetStates()
}

function useState(initialState) {
  
  if (typeof states[count] == "undefined") {
    states[count] = initialState;
  }
  const index = count;
  var state = states[index];

  const setState = (newValue) => {
    if (typeof newValue == "function") {
      states[index] = newValue(states[index])
    } else {
      states[index] = newValue;
    }
    state = states[index]
    console.log("new state is:", states[index], "state is =>" , state);
    rerender()
  };
  console.log(state);
  
  count++;
  return [state, setState];
};



export { useState, reset };
