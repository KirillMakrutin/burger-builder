import React from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';

class Checkout extends React.Component {
  handleCheckoutCancel = () => {
    this.props.history.goBack();
  };

  handleCheckoutContinue = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ingredients) {
      summary = (
        <Auxiliary>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            checkoutCanceled={this.handleCheckoutCancel}
            checkoutContinued={this.handleCheckoutContinue}
          />;
          <Route
            path={this.props.match.path + '/contact-data'}
            component={ContactData}
          />
        </Auxiliary>
      );
    }

    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients
  };
};

export default connect(mapStateToProps)(Checkout);
