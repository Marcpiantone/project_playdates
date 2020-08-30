const initialState = {
  tribe: null,
  status: "loading",
};

export default function tribesReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_TRIBE": {
      return { ...state, tribe: action.tribe, status: "idle" };
    }
    case "REQUEST_TRIBE": {
      return { ...state, status: "loading" };
    }
    case "CLEAR_TRIBE": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getTribe = (state) => {
  return state.tribe;
};
