import React from 'react';
import Aux from '../../../hoc/aux/aux';
import Button from '../../../Ui/button/button';


const orderSummary=(props)=>{
  
    const ingredientSummary=Object.keys(props.ingredients)
        .map(igkey=>{
        return <li key={igkey}>
            <span style={{textTransform:'capitalize'}}>{igkey}</span>
            :{props.ingredients[igkey]}</li>
        })

    return(
        <Aux>
           <h3>Your order</h3>
           <hr />
           <p>A delecious burger with the following ingredients:</p>
           <ul>
              {ingredientSummary}
           </ul>
          <p><strong>Total Price : {props.price.toFixed(2)}</strong></p>
           <p>Continue to checkout ?</p>
           <Button btnType='Danger' clicked={props.cancelPurchase}>cancel</Button>
           <Button btnType='Success' clicked={props.continuePurchase}>Continue</Button>
        </Aux>
    )
}

export default orderSummary;