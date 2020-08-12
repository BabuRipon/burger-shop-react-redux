import React,{Component} from 'react';
import Burger from '../../component/burger/burger';
import BuildControls from '../../component/burger/BuildControl/BuildControl';
import Modal from '../../Ui/modal/modal';
import OrderSummary from '../../component/burger/OrderSummary/orderSummary';
import Aux from '../../hoc/aux/aux';
import axios from '../../axios-order';
import Spinner from '../../Ui/spinner/spinner';
import withError from '../../Ui/withErrorHandler/withErrorHandler';
import * as actionTypes from '../../store/actionType';
import {connect}from 'react-redux'


const ingredient_price={
    salad:0.5,
    cheese:0.4,
    bacon:0.6,
    meat:1.3
}

class BurgerBuilder extends Component{

    // constructor(props){
    //     super(props)
    //     this.state={

    //     }
    // }

    state={
        purchasing:false,
        loading:false,
        error:null
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
     this.setState({purchasing:true})
 }

 closeBackdropHandler=()=>{
     this.setState({purchasing:false})
 }

 purchaseContinueHandler=()=>{
    //  alert('You Continue');

    const queryParams=[];
    for(let i in this.state.ingredients){
        queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.state.ingredients[i]))
    }

    queryParams.push('price='+this.state.totalPrice);

    const queryString=queryParams.join('&');

    this.props.history.push({
        pathname:'/checkout',
        search:'?'+queryString
    });
 }

    render(){
       
         const disableInfo={
             ...this.props.ing
         }

         for(let key in disableInfo){
             disableInfo[key]=disableInfo[key]<=0 ;
         }

         let orderSummary=null;

        let burger=this.state.error?<p>{this.state.error}</p>:<Spinner />;


         if(this.props.ing){

            orderSummary=<OrderSummary 
                cancelPurchase={this.closeBackdropHandler}
                continuePurchase={this.purchaseContinueHandler}
                ingredients={this.props.ing} price={this.props.price}/>

             burger = (
                 <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls 
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


         if(this.state.loading){
            orderSummary=<Spinner />
        }


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
        ing:state.ingredients,
        price:state.totalPrice
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        onAddIngredient:(name)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingName:name}),
        onRemoveIngredient:(name)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingName:name})
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(withError(BurgerBuilder,axios));