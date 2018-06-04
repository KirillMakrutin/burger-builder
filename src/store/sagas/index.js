import { all, takeEvery } from 'redux-saga/effects';
import {
  authCheckStateSaga,
  authUserSaga,
  checkoutTimeoutSaga,
  logoutSaga
} from './auth';
import { initIngredients } from './burgerBuilder';
import { fetchOrders, purchaseBurger } from './order';
import * as actionType from '../actions/actionTypes';

export function* watchAuth() {
  yield all([
    takeEvery(actionType.AUTH_INITIATE_LOGOUT, logoutSaga),
    takeEvery(actionType.AUTH_CHECK_TIMEOUT, checkoutTimeoutSaga),
    takeEvery(actionType.AUTH_USER, authUserSaga),
    takeEvery(actionType.AUTH_CHECK_STATE, authCheckStateSaga)
  ]);
}

export function* watchBurger() {
  yield takeEvery(actionType.INIT_INGREDIENTS, initIngredients);
}

export function* watchOrder() {
  yield takeEvery(actionType.FETCH_ORDERS, fetchOrders);
  yield takeEvery(actionType.PURCHASE_BURGER, purchaseBurger);
}
