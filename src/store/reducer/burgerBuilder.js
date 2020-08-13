import * as actionTypes from '../action/actionType';
import { act } from 'react-dom/test-utils';

const initialState={
    ingredients:null,
    totalPrice:4,
    error:false,
}

const ingredient_price={
    salad:0.5,
    cheese:0.4,
    bacon:0.6,
    meat:1.3
}

const reducer=(state=initialState,action)=>{
     switch(action.type){
         case actionTypes.ADD_INGREDIENT:
             return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingName]:state.ingredients[action.ingName]+1
                },
                totalPrice:state.totalPrice+ingredient_price[action.ingName]
             }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients:{
                    ...state.ingredients,
                    [action.ingName]:state.ingredients[action.ingName]-1
                },
                totalPrice:state.totalPrice-ingredient_price[action.ingName]
            }
        case actionTypes.SET_INGREDIENTS:
            return{
                ...state,
                ingredients:action.ingredients,
                error:false,
            }
        case actionTypes.FETCH_INGREDIENT_FAILED:
            return{
                ...state,
                error:true
            }

     }
     return state;
}

export default reducer;