/***************** side effect logic ****************/
let effects = [];
let currentIndex = 0;

function useEffect(callback, deps) {
  const previous = effects[currentIndex];
  let hasChanged;
  
  if (!previous) {
    hasChanged = true;
  } else {
    hasChanged = false;
    for (let i = 0; i < deps.length; i++) {
      if (deps[i] !== previous.deps[i]) {
        hasChanged = true;
        break;
      }
    }
  }

  if (hasChanged) {
    if (previous && typeof previous.cleanup === "function") {
      previous.cleanup(); // cleanup previous effect
    }
    const cleanup = callback();
    effects[currentIndex] = { deps, cleanup };
  }

  currentIndex++;
}

function resetEffects() {
  // reset before each render cycle
  currentIndex = 0;
}

export const effect = {
  useEffect,
  resetEffects,
};