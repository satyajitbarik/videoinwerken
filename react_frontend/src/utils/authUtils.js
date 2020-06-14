import store from "../store";

export function getUserToken(state) {
  return state.auth.token;
}

export function getUserToken1() {
  return store.getState().auth.token;
}
