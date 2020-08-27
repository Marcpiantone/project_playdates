import { combineReducers } from "redux";

import appUser from "./user.reducer";
import tribes from "./tribes.reducer";
import tribe from "./tribe.reducer";

export default combineReducers({
  appUser,
  tribes,
  tribe,
});
