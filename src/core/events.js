const Events = {};

export function registerEvent(eventName, callback) {
  if (!Events[eventName]) {
    Events[eventName] = [];
  }
  Events[eventName].push(callback);
}

export function triggerEvent(eventName, data) {
  if (Events[eventName]) {
    Events[eventName].forEach(callback => callback(data));
  }
}
