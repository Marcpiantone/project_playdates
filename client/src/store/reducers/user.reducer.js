const initialState = {
  appUser: {},
  payload: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS": {
      return { ...state, appUser: action.user, payload: action.payload };
    }
    case "SIGNUP_ERROR": {
      return {
        ...state,
        payload: action.payload,
      };
    }
    case "SIGNOUT_SUCCESS": {
      return initialState;
    }
    case "SIGNOUT_ERROR": {
      return { ...state, payload: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getAppUser = (state) => {
  return state.appUser.appUser;
};
