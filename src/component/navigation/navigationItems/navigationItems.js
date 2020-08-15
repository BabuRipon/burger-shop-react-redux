import React from 'react';
import classes from './navigationItems.module.css';
import NavigationItem from './navigationItem/navigationItem';
import {connect}from 'react-redux';

const navigationItems=(props)=>(
  <ul className={classes.NavigationItems}>
      <NavigationItem link="/" >Burger-Builder</NavigationItem>
      <NavigationItem link="/orders">Orders</NavigationItem>
      {props.isAuthenticated?
      <NavigationItem link="/logout">Logout</NavigationItem>
      :<NavigationItem link="/auth">Authenticate</NavigationItem>
    }
  </ul>
)

const mapStateToProps=(state)=>{
  return {
    isAuthenticated:state.auth.token!==null
  }
}

export default connect(mapStateToProps)(navigationItems);