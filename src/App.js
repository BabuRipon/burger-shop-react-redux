import React,{Component} from 'react';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import Layout from './hoc/layouts/layouts';
import Checkout from './container/checkout/checkout';
import {Route,Switch,Redirect}from 'react-router-dom'
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

    let routes=(
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/auth" exact component={Auth} />
        <Redirect to="/" />
      </Switch>
    )

    if(this.props.isAuthencated){
      routes= <Switch>
                <Route path="/" exact component={BurgerBuilder} />
                <Route path="/checkout" component={Checkout}   />
                <Route path="/orders" component={Orders} />
                <Route path="/auth" exact component={Auth} />
                <Route path="/logout" exact component={Logout} />
            </Switch>
    }

    return(
      <div>
          <Layout>
            {routes}
          </Layout>
      </div>
    )
  }
}

const mapStateToProps=(state)=>{
  return{
    isAuthencated:state.auth.token!==null
  }
}

const mapDispatchToProps=(dispatch)=>{
  return{
    onTryAutoSignIn:()=>dispatch(actionCreator.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
