import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/ui/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';

class BurgerBuilder extends React.Component {
  state = {
    purchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    /*axios
        .get('/ingredients.json')
        .then(response => {
          this.setState({ ingredients: response.data });
        })
        .catch(() => {
          this.setState({ error: true });
        });*/
  }

  updatePurchaseState(ingredients) {
    const ingredient = {
      ...ingredients
    };

    const sum = Object.keys(ingredient)
      .map(igKey => {
        return ingredient[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    return sum > 0;
  }

  handlePurchase = () => {
    this.setState({
      purchasing: true
    });
  };

  handlePurchaseCancel = () => {
    this.setState({
      purchasing: false
    });
  };

  handlePurchaseContinue = () => {
    this.props.history.push('/checkout');
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cannot be loaded</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Auxiliary>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            price={this.props.totalPrice}
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.handlePurchase}
          />
        </Auxiliary>
      );

      orderSummary = (
        <OrderSummary
          totalPrice={this.props.totalPrice.toFixed(2)}
          purchaseCanceled={this.handlePurchaseCancel}
          purchaseContinued={this.handlePurchaseContinue}
          ingredients={this.props.ings}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner />;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.handlePurchaseCancel}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingName =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, ingredientName: ingName }),
    onIngredientRemoved: ingName =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  withErrorHandler(BurgerBuilder, axios)
);
