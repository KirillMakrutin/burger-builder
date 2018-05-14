import React from 'react';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
import { connect } from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Name'
        },
        touched: false,
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      street: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Address'
        },
        touched: false,
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      zipCode: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        touched: false,
        value: '',
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        },
        valid: false
      },
      country: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Country'
        },
        touched: false,
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      email: {
        elementType: 'input',
        config: {
          type: 'email',
          placeholder: 'Your Email'
        },
        touched: false,
        value: '',
        validation: {
          required: true
        },
        valid: false
      },
      deliveryMethod: {
        elementType: 'select',
        config: {
          options: [
            { value: 'fastest', displayValue: 'Fastest' },
            { value: 'normal', displayValue: 'Normal' },
            { value: 'cheapest', displayValue: 'Cheapest' }
          ]
        },
        valid: true,
        value: 'normal'
      }
    },
    formIsValid: false,
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  checkValidity = (value, rules) => {
    if (!rules) {
      return true;
    }

    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minlength) {
      isValid = value.length >= rules.minlength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  };

  handleInputChange = (event, inputIdentifier) => {
    const updatedForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = { ...updatedForm[inputIdentifier] };
    updatedFormElement.value = event.target.value;
    updatedFormElement.touched = true;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );

    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (let inputIdentifier in updatedForm) {
      formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
    }

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  handleOrder = event => {
    event.preventDefault();

    const formData = {};

    for (let element in this.state.orderForm) {
      formData[element] = this.state.orderForm[element].value;
    }

    // alert('You continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }

    let form = (
      <form onSubmit={this.handleOrder}>
        {formElementArray.map(element => (
          <Input
            key={element.id}
            touched={element.config.touched}
            invalid={!element.config.valid}
            shouldValidate={element.config.validation}
            elementType={element.config.elementType}
            config={element.config.config}
            value={element.config.value}
            changed={event => this.handleInputChange(event, element.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );

    if (this.props.loading) {
      form = <Spinner />;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatcherToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(mapStateToProps, mapDispatcherToProps)(
  withErrorHandler(ContactData, axios)
);
