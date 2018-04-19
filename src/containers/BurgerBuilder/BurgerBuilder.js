import React from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.4
};

class BurgerBuilder extends React.Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    purchasing: false
  };

  updatePurchaseState(ingredients) {
    const ingredient = {
      ...ingredients
    };

    const sum = Object.keys(ingredient)
      .map(igKey => {
        return ingredient[igKey];
      })
      .reduce((sum, el) => sum + el, 0);

    this.setState({
      purchasable: sum > 0
    });
  }

  handleAddIngredient = type => {
    const oldCount = this.state.ingredients[type];
    const updatedCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

  handleRemoveIngredient = type => {
    const oldCount = this.state.ingredients[type];

    if (oldCount <= 0) {
      return;
    }

    const updatedCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = INGREDIENT_PRICES[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceAddition;
    this.setState({
      ingredients: updatedIngredients,
      totalPrice: newPrice
    });
    this.updatePurchaseState(updatedIngredients);
  };

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
    // alert('You continue!');
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Kirill',
        address: {
          street: 'Molodejnaja 19',
          zip: '4111',
          country: 'Belarus'
        },
        email: 'test@test.com'
      },
      deliveryMethod: 'fastest'
    };
    axios
      .post('/orders.json', order)
      .then(response => console.log(response))
      .catch(error => console.log(error));
  };

  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Auxiliary>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.handlePurchaseCancel}
        >
          <OrderSummary
            totalPrice={this.state.totalPrice.toFixed(2)}
            purchaseCanceled={this.handlePurchaseCancel}
            purchaseContinued={this.handlePurchaseContinue}
            ingredients={this.state.ingredients}
          />
        </Modal>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          price={this.state.totalPrice}
          ingredientAdded={this.handleAddIngredient}
          ingredientRemoved={this.handleRemoveIngredient}
          disabled={disabledInfo}
          purchasable={this.state.purchasable}
          ordered={this.handlePurchase}
        />
      </Auxiliary>
    );
  }
}

export default BurgerBuilder;
