import * as actionType from './actionType';
import axios from '../../axios-order';

export const addIngredient=(name)=>{
    return{
       type:actionType.ADD_INGREDIENT,
       ingName:name
    }
}

export const removeIngredient=(name)=>{
    return{
        type:actionType.REMOVE_INGREDIENT,
        ingName:name
    }
}

export const setIngredients=(ingredients)=>{
    return {
         type:actionType.SET_INGREDIENTS,
         ingredients:ingredients
    }
}

export const fetchIngredientFailed=()=>{
    return{
        type:actionType.FETCH_INGREDIENT_FAILED
    }
}

export const priceInit=(value)=>{
    return {
        type:actionType.PRICE_INIT,
        price:value
    }
}

export const initialPrice=()=>{
    return dispatch=>{
        axios.get('/totalPrice.json')
          .then(res=>{
              dispatch(priceInit(res.data))
          })

    }
}

export const initialIngredients=()=>{
    return dispatch=>{
       axios.get('/ingredients.json')
         .then(res=>{
             console.log(res.data)
             dispatch(setIngredients(res.data))
         })
         .catch(err=>{
             console.log(err.message);
             dispatch(fetchIngredientFailed())
         })
    }
}