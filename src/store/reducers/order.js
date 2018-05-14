import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

function purchaseSuccess(action, state) {
  const newOrder = updateObject(action.orderData, { id: action.orderId });
  return updateObject(state, {
    loading: false,
    purchased: true,
    orders: state.orders.concat(newOrder)
  });
}

function failed(state, action) {
  return updateObject(state, {
    loading: false,
    error: action.error
  });
}

function start(state) {
  return updateObject(state, { loading: true });
}

function purchaseInit(state) {
  return updateObject(state, { purchased: false });
}

function fetchOrdersSucceed(state, action) {
  return updateObject(state, {
    loading: false,
    orders: action.orders
  });
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BUILDER_SUCCESS:
      return purchaseSuccess(action, state);

    case actionTypes.PURCHASE_BUILDER_FAIL:
    case actionTypes.FETCH_ORDERS_FAIL:
      return failed(state, action);

    case actionTypes.PURCHASE_BUILDER_START:
    case actionTypes.FETCH_ORDERS_START:
      return start(state);

    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state);

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSucceed(state, action);

    default:
      return state;
  }
};

export default reducer;
