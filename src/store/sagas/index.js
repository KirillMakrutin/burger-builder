import { takeEvery } from 'redux-saga/effects';
import {
  authCheckStateSaga,
  authUserSaga,
  checkoutTimeoutSaga,
  logoutSaga
} from './auth';
import * as actionType from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
  yield takeEvery(actionType.AUTH_USER, authUserSaga);
  yield takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga);
}
