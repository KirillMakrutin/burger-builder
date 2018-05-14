import React from 'react';
import Input from '../../components/ui/Input/Input';
import Button from '../../components/ui/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import Spinner from '../../components/ui/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

class Auth extends React.Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        config: {
          type: 'email',
          placeholder: 'Mail Address'
        },
        touched: false,
        value: '',
        validation: {
          required: true,
          isEmail: true
        },
        valid: false
      },
      password: {
        elementType: 'input',
        config: {
          type: 'password',
          placeholder: 'Password'
        },
        touched: false,
        value: '',
        validation: {
          required: true,
          minLength: 6
        },
        valid: false
      }
    },
    isSignUp: true
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

  handleSwitchAuthMode = event => {
    event.preventDefault();

    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };

  handleInputChange = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementArray.map(formElement => (
      <Input
        key={formElement.id}
        touched={formElement.config.touched}
        invalid={!formElement.config.valid}
        shouldValidate={formElement.config.validation}
        elementType={formElement.config.elementType}
        config={formElement.config.config}
        value={formElement.config.value}
        changed={event => this.handleInputChange(event, formElement.id)}
      />
    ));

    let errorMessage = null;

    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuthenticated) {
      authRedirect = <Redirect to="/" />;
    }

    return this.props.loading ? (
      <Spinner />
    ) : (
      <div className={classes.Auth}>
        {authRedirect}
        {errorMessage}
        <form onSubmit={this.handleSubmit}>
          {form}
          <Button btnType="Success">
            {this.state.isSignUp ? 'SIGN UP' : 'SIGN IN'}
          </Button>
          <br />
          <Button btnType="Danger" clicked={this.handleSwitchAuthMode}>
            {this.state.isSignUp ? 'SWITCH TO SIGN IN' : 'SWITCH TO SIGN UP'}
          </Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
