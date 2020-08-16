import * as actionType from './actionType';
import axios from '../../axios-order';

export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
        type:actionType.PURCHASE_BURGER_SUCCESS,
        orderId:id,
        orderData:orderData
    }
}

export const  purchaseBurgerFailed=(error)=>{
    return{
        type:actionType.PURCHASE_BURGER_FAILED,
        error:error
    }
}

export const purchseBurgerStart=()=>{
    return {
        type:actionType.PURCHASE_BURGER_START,
    }
}

export const  purchaseInit=()=>{
    return{
        type:actionType.PURCHASE_INIT
    }
}

export const purchaseBurger=(orderData,token)=>{
    return dispatch=>{
        dispatch(purchseBurgerStart())
        axios.post('/orders.json?auth='+token,orderData)
        .then(res=>{
            console.log(res.data)
            dispatch(purchaseBurgerSuccess(res.data.name,orderData))
        })
        .catch(err=>{
            dispatch(purchaseBurgerFailed(err))
        })
    }
}

export const fetchOrderSuccess=(orders)=>{
    return{
      type:actionType.FETCH_ORDER_SUCCESS,
      orders:orders
    }
}

export const fetchOrderFailed=(err)=>{
    return{
        type:actionType.FETCH_ORDER_FAILED,
        error:err
    }
}

export const fetchOrderStart=()=>{
    return{
        type:actionType.FETCH_ORDER_START
    }
}

export const fetchOrdersFromServer=(token,userId)=>{
    return dispatch=>{
        dispatch(fetchOrderStart())
        const queryParams='?auth='+token+'&orderBy="userId"&equalTo="'+userId+'"';
        axios.get('/orders.json'+queryParams)
        .then(res=>{
            const fetchOrder=[];
            for(let key in res.data){
                fetchOrder.push({
                    ...res.data[key],
                    id:key
                })
            }
            dispatch(fetchOrderSuccess(fetchOrder));
        })
        .catch(err=>{
            dispatch(fetchOrderFailed(err))
        }) 
    }
}