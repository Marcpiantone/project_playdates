const initialState = {
  tribes: null,
  status: "loading",
};

export default function tribesReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_TRIBES": {
      return { ...state, tribes: action.tribes, status: "idle" };
    }
    case "CLEAR_TRIBES": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getTribes = (state) => {
  return state.tribes;
};
