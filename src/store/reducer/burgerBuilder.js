import * as actionTypes from '../action/actionType';

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
         case actionTypes.PRICE_INIT:
             return{
                 ...state,
                 totalPrice:action.price
             }
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
                ingredients:{
                    salad:action.ingredients.salad,
                    cheese:action.ingredients.cheese,
                    bacon:action.ingredients.bacon,
                    meat:action.ingredients.meat
                },
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