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

export const purchaseBurger=(orderData)=>{
    return dispatch=>{
        axios.post('/orders.json',orderData)
        .then(res=>{
            console.log(res.data)
            dispatch(purchaseBurgerSuccess(res.data.name,orderData))
        })
        .catch(err=>{
            dispatch(purchaseBurgerFailed(err))
        })
    }
}