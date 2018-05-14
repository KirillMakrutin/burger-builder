import React, { Component } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignUp();
  }

  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/orders" component={Orders} />
            <Route path="/checkout" component={Checkout} />
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/auth" exact component={Auth} />
            <Route path="/logout" exact component={Logout} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignUp: () => dispatch(actions.authCheckState())
  };
};

export default connect(null, mapDispatchToProps)(App);
