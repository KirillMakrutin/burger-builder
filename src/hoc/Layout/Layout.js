import React from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

class Layout extends React.Component {
  state = {
    showSideDrawer: false
  };

  handleSideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  handleSideDrawerToggle = prevState => {
    this.setState({ showSideDrawer: !prevState.showSideDrawer });
  };

  render() {
    return (
      <Auxiliary>
        <Toolbar
          drawerToggleClicked={this.handleSideDrawerToggle}
          isAuth={this.props.isAuthenticated}
        />
        <SideDrawer
          isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  };
};

export default connect(mapStateToProps)(Layout);
