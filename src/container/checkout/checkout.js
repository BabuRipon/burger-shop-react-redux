import React,{Component} from 'react';
import CheckoutSummary from '../../component/order/checkoutSummary/checkoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';


class Checkout extends Component{

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
               ingredients={this.props.ing}
               checkoutCancelled={this.onCheckoutCancelledHandler}
               checoutContinue={this.onCheckoutContinuedHandler}
               />
               <Route path={this.props.match.path+'/contact-data'} 
               component={ContactData} />
           </div>
       )
   }
}

const mapStateToProps=(state)=>{
    return{
        ing:state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout);