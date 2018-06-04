import * as actions from '../actions';
import axios from '../../axios-orders';
import { put } from 'redux-saga/effects';

export function* purchaseBurger(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      '/orders.json?auth=' + action.token,
      action.orderData
    );
    yield put(
      actions.purchaseBurgerSuccess(response.data.name, action.orderData)
    );
    yield put(actions.resetIngredients());
  } catch (error) {
    yield put(actions.purchaseBurgerFail(error));
  }
}

export function* fetchOrders(action) {
  yield put(actions.fetchOrdersStart());

  const queryParams =
    '?auth=' +
    action.token +
    '&orderBy="userId"&equalTo="' +
    action.userId +
    '"';

  try {
    const res = yield axios.get('/orders.json' + queryParams);
    const fetchOrders = [];
    for (let key in res.data) {
      fetchOrders.push({
        ...res.data[key],
        id: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchOrders));
  } catch (err) {
    yield put(actions.fetchOrdersFail(err));
  }
}
