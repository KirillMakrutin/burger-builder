import React from 'react';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';

class ContactData extends React.Component {
  state = {
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
      price: this.props.price,
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
      .then(response => {
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(error => this.setState({ loading: false }));
  };

  render() {
    let form = (
      <form>
        <Input
          label="Put Your Name"
          inputtype="input"
          type="text"
          name="name"
          placeholder="Your Name"
        />
        <Input type="text" name="email" placeholder="Your Email" />
        <Input type="text" name="street" placeholder="Street" />
        <Input type="text" name="postal" placeholder="Postal Code" />
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
