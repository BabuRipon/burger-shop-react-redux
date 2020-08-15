import * as actionType from '../action/actionType';
import { updateObject } from '../utility';

const initialState={
    orders:[],
    loading:false,
    purchased:false,
}

const purchaseBurger=(state,action)=>{
    const newOrder=updateObject(action.orderData,{id:action.orderId})
    return updateObject(state,{ 
        loading:false,
        purchased:true,
        orders:state.orders.concat(newOrder)})
}

const fetchOrderSuccess=(state,action)=>{
    return updateObject(state,{ 
        orders:action.orders,
        loading:false})
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.PURCHASE_INIT:return updateObject(state,{purchased:false})
        case actionType.PURCHASE_BURGER_START:return updateObject(state,{ loading:true})
        case actionType.PURCHASE_BURGER_SUCCESS:return purchaseBurger(state,action);
        case actionType.PURCHASE_BURGER_FAILED:return updateObject(state,{loading:false})
        case actionType.FETCH_ORDER_START:return updateObject(state,{ loading:true})
        case actionType.FETCH_ORDER_SUCCESS:return fetchOrderSuccess(state,action); 
        case actionType.FETCH_ORDER_FAILED:return updateObject(state,{ loading:false})  
        default:return state
    }
}



export default reducer;