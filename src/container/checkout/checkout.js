import React,{Component} from 'react';
import CheckoutSummary from '../../component/order/checkoutSummary/checkoutSummary';
import {Route, Redirect} from 'react-router-dom';
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

    let summary=<Redirect to='/' />

    if(this.props.ing){
        let RedirectHome=this.props.purchased?<Redirect to='/' />:null
        summary=(
            <div>
                {RedirectHome}
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

       return summary
   }
}

const mapStateToProps=(state)=>{
    return{
        ing:state.burgerBuilder.ingredients,
        purchased:state.order.purchased,
    }
}

export default connect(mapStateToProps)(Checkout);