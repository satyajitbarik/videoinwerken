import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import rootReducer from "../reducers";

function configureStore(initialState) {
  const logger = createLogger();
  const middleware = applyMiddleware(thunk, logger);

  const createStoreWithMiddleware = compose(middleware);

  return createStoreWithMiddleware(createStore)(rootReducer, initialState);
}

const store = configureStore();

export default store;
