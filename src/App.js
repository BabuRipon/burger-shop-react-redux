import React,{Component} from 'react';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import Layout from './hoc/layouts/layouts';
import Checkout from './container/checkout/checkout';
import {Route,Switch}from 'react-router-dom'
import Orders from './container/order/order';
import Auth from './container/Auth/auth';
import Logout from './container/Auth/logout/logout';
import {connect }from 'react-redux'
import * as actionCreator from './store/action/index'


class App extends Component{

  componentDidMount(){
      this.props.onTryAutoSignIn();
  }

  render(){
    return(
      <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout}   />
              <Route path="/orders" component={Orders} />
              <Route path="/auth" exact component={Auth} />
              <Route path="/logout" exact component={Logout} />
            </Switch>
          </Layout>
      </div>
    )
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignIn:()=>dispatch(actionCreator.authCheckState())
  }
}

export default connect(null,mapDispatchToProps)(App);
