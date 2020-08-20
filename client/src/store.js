import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import firebase from "./services/firebase";
import reducer from "./store/reducers";
import { reactReduxFirebase } from "react-redux-firebase";

const createStoreWithFirebase = compose(reactReduxFirebase(firebase))(
  createStore
);

export default function configureStore(initialState) {
  const store = createStoreWithFirebase(
    reducer,
    initialState,
    applyMiddleware(reduxThunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  return store;
}
