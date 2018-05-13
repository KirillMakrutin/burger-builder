import * as actionTypes from '../actions/actionTypes';

const initialState = {
  orders: [],
  loading: false,
  purchased: false
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BUILDER_SUCCESS:
      const newOrder = {
        ...action.orderData,
        id: action.orderId,
        purchased: true
      };
      return {
        ...state,
        loading: false,
        orders: state.orders.concat(newOrder)
      };

    case actionTypes.PURCHASE_BUILDER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.PURCHASE_BUILDER_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PURCHASE_INIT:
      return {
        ...state,
        purchased: false
      };

    case actionTypes.FETCH_ORDERS_START:
      return {
        ...state,
        loading: true
      };

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      };

    case actionTypes.FETCH_ORDERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
};

export default reducer;
