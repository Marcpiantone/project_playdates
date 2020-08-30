import { combineReducers } from "redux";

import appUser from "./user.reducer";
import tribes from "./tribes.reducer";
import tribe from "./tribe.reducer";
import events from "./events.reducer";

export default combineReducers({
  appUser,
  tribes,
  tribe,
  events,
});
