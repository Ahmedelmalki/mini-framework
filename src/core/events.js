const Event = {};

// register event comming from user
export function registerEvent(eventName, callback) {
  Event[eventName] = callback;
}

// apply event if it is the one 
export function triggerEvent(eventName, data) {
  if (Event[eventName]) {
    Event[eventName](data);
  }
}
