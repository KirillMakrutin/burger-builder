import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import { delay } from 'redux-saga';
import axios from 'axios';

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.logoutSucceed());
}

export function* checkoutTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());

  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };

  let defaultUrl =
    'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCYtexWtDh60B0OV4SuJ5GC-_SBePrMLhk';

  if (!action.isSignUp) {
    defaultUrl =
      'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCYtexWtDh60B0OV4SuJ5GC-_SBePrMLhk';
  }

  try {
    const res = yield axios.post(defaultUrl, authData);

    const expirationDate = new Date(
      new Date().getTime() + res.data.expiresIn * 1000
    );

    localStorage.setItem('token', res.data.idToken);
    localStorage.setItem('userId', res.data.localId);
    localStorage.setItem('expirationDate', expirationDate);

    yield put(actions.authSuccess(res.data.idToken, res.data.localId));
    yield put(actions.checkAuthTimeout(res.data.expiresIn));
  } catch (error) {
    yield put(actions.authFail(error.response.data.error));
  }
}

export function* authCheckStateSaga() {
  const token = yield localStorage.getItem('token');
  if (!token) {
    yield put(actions.logout());
  } else {
    const expirationDate = yield new Date(
      localStorage.getItem('expirationDate')
    );
    if (expirationDate > new Date()) {
      yield put(
        actions.authSuccess(
          localStorage.getItem('token'),
          localStorage.getItem('userId')
        )
      );
      yield put(
        actions.checkAuthTimeout(
          (expirationDate.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      yield put(actions.logout());
    }
  }
}
