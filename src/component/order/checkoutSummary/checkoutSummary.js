import React from 'react';
import Burger from '../../burger/burger';
import Button from '../../../Ui/button/button';
import classes from './checkoutSummary.module.css'

const checkoutSummary=(props)=>{
  return(
      <div className={classes.CheckoutSummary}>
          <h1>We hope its test well</h1>
          <div  style={{width:'100%',margin:'auto'}}>
              <Burger ingredients={props.ingredients} />
          </div>
         <Button btnType="Danger" clicked={props.checkoutCancelled}>
            Cancel
         </Button>
         <Button btnType="Success" clicked={props.checoutContinue}>
            Continue
         </Button>
      </div>
  )
}

export default checkoutSummary;