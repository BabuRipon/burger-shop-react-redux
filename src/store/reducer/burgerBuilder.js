import * as actionTypes from '../action/actionType';
import { updateObject } from '../utility';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
    building:false,
}

const ingredient_price={
    salad:0.5,
    cheese:0.4,
    bacon:0.6,
    meat:1.3
}

const addIngredient=(state,action)=>{
    const updateIngredients=updateObject(state.ingredients,
        { [action.ingName]:state.ingredients[action.ingName]+1})
     return updateObject(state,{ingredients:updateIngredients,
        totalPrice:state.totalPrice+ingredient_price[action.ingName],
        building:true
    })
}

const removeIngredients=(state,action)=>{
    const updateIng=updateObject(state.ingredients,
        { [action.ingName]:state.ingredients[action.ingName]-1})
     return updateObject(state,{ingredients:updateIng,
        totalPrice:state.totalPrice+ingredient_price[action.ingName],
        building:true
    })
}

const setIngredients=(state,action)=>{
    return updateObject(state,
        { 
            ingredients:{
            salad:action.ingredients.salad,
            cheese:action.ingredients.cheese,
            bacon:action.ingredients.bacon,
            meat:action.ingredients.meat
                },
            error:false,
            building:false
        }
        )
}

const reducer=(state=initialState,action)=>{
     switch(action.type){
        case actionTypes.PRICE_INIT:return updateObject(state,{totalPrice:action.price})    
        case actionTypes.ADD_INGREDIENT:return addIngredient(state,action) ;  
        case actionTypes.REMOVE_INGREDIENT: return removeIngredients(state,action)    
        case actionTypes.SET_INGREDIENTS:return setIngredients(state,action)    
        case actionTypes.FETCH_INGREDIENT_FAILED:return updateObject(state,{error:true})
        default:return state;

     }
     
}

export default reducer;