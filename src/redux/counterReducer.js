const initialCounterState = {
  counter: 0,
};

export function counterReducer(state = initialCounterState, action) {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + action.payload };
    case "DECREMENT":
      return { ...state, counter: state.counter - action.payload };
    case "HUNDRED":
      return { ...state, counter: state.counter + 100 };
    default:
      return state;
  }
}
