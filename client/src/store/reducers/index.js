import { combineReducers } from "redux";

import appUser from "./user.reducer";
import tribes from "./tribes.reducer";

export default combineReducers({
  appUser,
  tribes,
});
