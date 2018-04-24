import React from 'react';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';

class ContactData extends React.Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: ''
      },
      street: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Address'
        },
        value: ''
      },
      zipCode: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Zip Code'
        },
        value: ''
      },
      country: {
        elementType: 'input',
        config: {
          type: 'text',
          placeholder: 'Country'
        },
        value: ''
      },
      email: {
        elementType: 'input',
        config: {
          type: 'email',
          placeholder: 'Your Email'
        },
        value: ''
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
        value: ''
      }
    },
    name: '',
    email: '',
    address: {
      street: '',
      postalCode: ''
    }
  };

  handleOrder = event => {
    event.preventDefault();

    this.setState({ loading: true });

    // alert('You continue!');
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
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
      <form>
        {formElementArray.map(element => (
          <Input
            key={element.id}
            elementType={element.config.elementType}
            config={element.config.config}
            value={element.config.value}
          />
        ))}
        <Button btnType="Success" clicked={this.handleOrder}>
          ORDER
        </Button>
      </form>
    );

    if (this.state.loading) {
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

export default ContactData;
