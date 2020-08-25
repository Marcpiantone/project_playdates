const initialState = {
  appUser: {},
  status: "loading",
  payload: "",
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case "SIGNUP_SUCCESS": {
      return { ...state, appUser: action.user.user, status: "idle" };
    }
    case "REQUEST_RETURN": {
      return { ...state, status: "loading" };
    }
    case "RETURN_SUCCESS": {
      return { ...state, appUser: action.user, status: "idle" };
    }

    case "RETURN_UNSUCCESS": {
      return { ...state, status: "login-idle" };
    }
    case "SIGNUP_ERROR": {
      return {
        ...state,
        status: "error",
        payload: action.payload,
      };
    }
    case "SIGNOUT_SUCCESS": {
      return initialState;
    }
    case "SIGNOUT_ERROR": {
      return { ...state, status: "error", payload: action.payload };
    }
    default: {
      return state;
    }
  }
}

export const getAppUser = (state) => {
  return state.appUser.appUser;
};

export const getAppUserStatus = (state) => {
  return state.appUser.status;
};
