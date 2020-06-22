import store from "../store";

export function getUserTokenOld(state) {
  return state.auth.token;
}

export function getUserToken() {
  return store.getState().auth.token;
}
