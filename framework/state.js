import { rerender } from "../src/main.js";

let states = {};
let count = 0;

const resetCount = ()=> count = 0;

const useState = (initialState) => {
  count++;
  if (typeof states[count] == "undefined") {
    states[count] = initialState;
  }
  const index = count;
  const setState = (newValue) => {
    states[index] = newValue;
    console.log("new state is:", states[index]);
    rerender()
  };
  return [states[index], setState];
};



export { useState };
