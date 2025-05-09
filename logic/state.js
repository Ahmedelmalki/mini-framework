let state = {};
let listeners = [];

export function useState(key, initialValue) {
  if (state[key] === undefined) state[key] = initialValue;

  const setState = (newVal) => {
    state[key] = newVal;
    listeners.forEach(fn => fn());
  };

  return [() => state[key], setState];
}

export function subscribe(listener) {
  listeners.push(listener);
}
