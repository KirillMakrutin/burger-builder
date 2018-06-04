import { takeEvery } from 'redux-saga/effects';
import { authUserSaga, checkoutTimeoutSaga, logoutSaga } from './auth';
import * as actionType from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
  yield takeEvery(actionType.AUTH_USER, authUserSaga);
}
