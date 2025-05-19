const useState = (initialState) => {
  let state = initialState;

  function setState(newValue) {
    state = newValue;
  }

  return [state, setState];
};

export { useState };
