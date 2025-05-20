let state = {};
let listeners = [];

export function setState(newState) {
  state = { ...state, ...newState };
  listeners.forEach(l => l(state));
}

export function getState() {
  return state;
}

export function subscribe(listener) {
  listeners.push(listener);
}
