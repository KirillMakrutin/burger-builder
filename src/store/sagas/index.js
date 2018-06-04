import { takeEvery } from 'redux-saga/effects';
import { checkoutTimeoutSaga, logoutSaga } from './auth';
import * as actionType from '../actions/actionTypes';

export function* watchAuth() {
  yield takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga);
}
