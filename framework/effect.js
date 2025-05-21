let effects = [];
let currentIndex = 0;
let unmountCallbacks = []; // Zedna array dyal unmount callbacks

function useEffect(callback, deps) {
  const previous = effects[currentIndex];
  let hasChanged;
  
  if (!previous) {
    hasChanged = true;
  } else if (!deps || !previous.deps || deps.length !== previous.deps.length) {
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
    
    // Register cleanup function to be called on unmount
    if (typeof cleanup === "function") {
      unmountCallbacks.push(cleanup);
    }
  }

  currentIndex++;
}

function resetEffects() {
  // reset before each render cycle
  currentIndex = 0;
}

// Fix: Zedna function jdida li kan3ayto liha f destroy component
function cleanupEffects() {
  // Run all cleanup functions
  effects.forEach(effect => {
    if (effect && typeof effect.cleanup === "function") {
      effect.cleanup();
    }
  });
  
  unmountCallbacks.forEach(cleanup => {
    if (typeof cleanup === "function") {
      cleanup();
    }
  });
  
  effects = [];
  unmountCallbacks = [];
  currentIndex = 0;
}

export const effect = {
  useEffect,
  resetEffects,
  cleanupEffects,
};