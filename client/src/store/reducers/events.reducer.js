const initialState = {
  events: null,
  status: "loading",
};

export default function eventsReducer(state = initialState, action) {
  switch (action.type) {
    case "RECEIVE_EVENTS": {
      return { ...state, events: action.events, status: "idle" };
    }
    case "REQUEST_EVENTS": {
      return { ...state, status: "loading" };
    }
    case "CLEAR_EVENTS": {
      return initialState;
    }
    default: {
      return state;
    }
  }
}

export const getEvents = (state) => {
  return state.events;
};
