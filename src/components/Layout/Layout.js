import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../navigation/Toolbar/Toolbar';
import SideDrawer from '../navigation/SideDrawer/SideDrawer';

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
        <Toolbar drawerToggleClicked={this.handleSideDrawerToggle} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.handleSideDrawerClosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxiliary>
    );
  }
}

export default Layout;
