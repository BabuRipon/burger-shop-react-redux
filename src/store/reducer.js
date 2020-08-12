import * as actionTypes from './actionType';

const initialState={
    ingredients:{
        salad:0,
        meat:0,
        cheese:0,
        bacon:0
    },
    totalPrice:4,
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

     }
     return state;
}

export default reducer;