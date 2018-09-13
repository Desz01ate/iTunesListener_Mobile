import { createStore, combineReducers, applyMiddleware } from "redux";
import MusicReducer from "../reducers";
import thunk from "redux-thunk";

export function configureStore() {
  const store = createStore(
    combineReducers({
      MusicReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
}
const store = configureStore();
export default store;
