import React,{Component} from 'react';
import Burger from '../../component/burger/burger';
import BuildControls from '../../component/burger/BuildControl/BuildControl';
import Modal from '../../Ui/modal/modal';
import OrderSummary from '../../component/burger/OrderSummary/orderSummary';
import Aux from '../../hoc/aux/aux';
import axios from '../../axios-order';
import Spinner from '../../Ui/spinner/spinner';
import withError from '../../Ui/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/action/index'
import {connect}from 'react-redux'


class BurgerBuilder extends Component{

    state={
        purchasing:false,
    }

componentDidMount(){
  this.props.onIngredientsInit();
  this.props.onInittialPrice();
}

 updatePurchasable(ingredient){
     const sum=Object.keys(ingredient).map(igkey=>{
         return ingredient[igkey]
     })
     .reduce((sum,el)=>{
        return sum+el;
     },0)

     return sum>0;
 }

 purchaseHandler=()=>{
     if(this.props.isAuthenticate){
        this.setState({purchasing:true})
     }
     else{
        this.props.onAuthRedirectPath('/checkout')
        this.props.history.push('/auth')
     }
     
 }

 closeBackdropHandler=()=>{
     this.setState({purchasing:false})
 }

 purchaseContinueHandler=()=>{
    this.props.onPurchaseInit();
    this.props.history.push('/checkout');
 }

    render(){
       
         const disableInfo={
             ...this.props.ing
         }

         for(let key in disableInfo){
             disableInfo[key]=disableInfo[key]<=0 ;
         }

         let orderSummary=null;

        let burger=this.props.error?<p>cound not fetch ingredients</p>:<Spinner />;


         if(this.props.ing){

            orderSummary=<OrderSummary 
                cancelPurchase={this.closeBackdropHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.props.ing} price={this.props.price}/>

             burger = (
                 <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls 
                    isAuth={this.props.isAuthenticate}
                    ingredientAdded={this.props.onAddIngredient}
                    ingredientRemove={this.props.onRemoveIngredient}
                    disabled={disableInfo}
                    price={this.props.price}
                    purchasable={this.updatePurchasable(this.props.ing)}
                    ordered={this.purchaseHandler}
                    />
                 </Aux>
             )

         }


        //  if(this.state.loading){
        //     orderSummary=<Spinner />
        // }


        return(
            <Aux>
                <Modal show={this.state.purchasing} closeBackdrop={this.closeBackdropHandler}>
                   {orderSummary}
                </Modal>
               {burger}
            </Aux>
        )
    }
}


const mapStateToProps=(state)=>{
    return {
        ing:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticate:state.auth.token!==null,
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAddIngredient:(name)=>dispatch(actionCreator.addIngredient(name)),
        onRemoveIngredient:(name)=>dispatch(actionCreator.removeIngredient(name)),
        onIngredientsInit:()=>dispatch(actionCreator.initialIngredients()),
        onPurchaseInit:()=>dispatch(actionCreator.purchaseInit()),
        onInittialPrice:()=>dispatch(actionCreator.initialPrice()),
        onAuthRedirectPath:(path)=>dispatch(actionCreator.authRedirectToPath(path))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withError(BurgerBuilder,axios));