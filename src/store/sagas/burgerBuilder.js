import axios from '../../axios-orders';
import * as actions from '../actions';
import { put } from 'redux-saga/effects';

export function* initIngredients() {
  try {
    const response = yield axios.get('/ingredients.json');
    yield put(actions.setIngredients(response.data));
  } catch (e) {
    yield put(actions.fetchIngredientsFailed());
  }
}
