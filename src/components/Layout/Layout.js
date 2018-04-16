import React from 'react';
import Auxiliary from '../../hoc/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../navigation/Toolbar/Toolbar';

const Layout = props => (
  <Auxiliary>
    <Toolbar />
    <main className={classes.Content}>{props.children}</main>
  </Auxiliary>
);

export default Layout;
