import React from 'react';
import classes from './BuildControl.module.css';
import BuildControl from './BuildControl/BuildControl';



const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},

]

const buildControls=(props)=>(
    <div className={classes.BuildControls}> 
        <p>Total Price : <strong>{props.price.toFixed(2)} $</strong></p>
        {controls.map(ctrl=>(
            <BuildControl 
            key={ctrl.label}
             label={ctrl.label} 
             addedIngredient={()=>props.ingredientAdded(ctrl.type)}
             removeIngredient={()=>props.ingredientRemove(ctrl.type)}
             disabled={props.disabled[ctrl.type]}
             />
        ))}
       <button 
       className={classes.OrderButton } 
       disabled={!props.purchasable}
       onClick={props.ordered}
       >{props.isAuth?'ORDER NOW':'sign-in to BUY'}</button>
    </div>
)

export default buildControls;