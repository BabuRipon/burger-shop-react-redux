import React,{Component} from 'react';
import CheckoutSummary from '../../component/order/checkoutSummary/checkoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';


class Checkout extends Component{

    state={
        ingredients:null,
        totalPrice:0
    }

    componentWillMount(){
        // console.log(this.props)

        const query=new URLSearchParams(this.props.location.search);
        const newingredients={};
        let price=0;
        for(let param of query.entries()){
            // console.log(param)
            if(param[0]==='price'){
               price=param[1];
            }else{
            newingredients[param[0]]=+param[1]
            }
        }

        this.setState({ingredients:newingredients,totalPrice:price})
    }

    onCheckoutCancelledHandler=()=>{
       this.props.history.goBack();
    }

    onCheckoutContinuedHandler=()=>{
       this.props.history.replace('/checkout/contact-data')
    }

   render(){
       return(
           <div>
               <CheckoutSummary 
               ingredients={this.state.ingredients}
               checkoutCancelled={this.onCheckoutCancelledHandler}
               checoutContinue={this.onCheckoutContinuedHandler}
               />
               <Route path={this.props.match.path+'/contact-data'} 
               render={(props)=>(<ContactData {...props} ingredients={this.state.ingredients} price={this.state.totalPrice}/>)} />
           </div>
       )
   }
}

export default Checkout;