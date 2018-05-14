import * as actionType from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false
};

function authStarted(state) {
  return updateObject(state, {
    error: null,
    token: null,
    userId: null,
    loading: true
  });
}

function authFailed(state, action) {
  return updateObject(state, {
    error: action.error,
    loading: false
  });
}

function authSucceed(state, action) {
  console.log(action.idToken, action.userId);

  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false
  });
}

function authLogout(state) {
  return updateObject(state, initialState);
}

const auth = (state = initialState, action) => {
  switch (action.type) {
    case actionType.AUTH_START:
      return authStarted(state);

    case actionType.AUTH_FAIL:
      return authFailed(state, action);

    case actionType.AUTH_SUCCESS:
      return authSucceed(state, action);

    case actionType.AUTH_LOGOUT:
      return authLogout(state);

    default:
      return state;
  }
};

export default auth;
