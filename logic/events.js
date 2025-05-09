const eventMap = {};

export function on(eventName, handler) {
  if (!eventMap[eventName]) eventMap[eventName] = [];
  eventMap[eventName].push(handler);
}

export function emit(eventName, payload) {
  (eventMap[eventName] || []).forEach(fn => fn(payload));
}
