import React,{Component} from 'react';
import BurgerBuilder from './container/burgerBuilder/burgerBuilder';
import Layout from './hoc/layouts/layouts';
import Checkout from './container/checkout/checkout';
import {Route,Switch}from 'react-router-dom'
import Orders from './container/order/order';


class App extends Component{
  render(){
    return(
      <div>
          <Layout>
            <Switch>
              <Route path="/" exact component={BurgerBuilder} />
              <Route path="/checkout" component={Checkout}   />
              <Route path="/orders" component={Orders} />
            </Switch>
          </Layout>
      </div>
    )
  }
}

export default App;
