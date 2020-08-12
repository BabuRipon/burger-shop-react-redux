import React from 'react';
import classes from './order.module.css';

const order=(props)=>{
    // console.log(props.ingredients);
    const ingredients=[];

    for(let key in props.ingredients){
       ingredients.push({
           amount:props.ingredients[key],
           name:key
       })
    }

    const ingredientsOutput=ingredients.map(ig=>(
        <span
        key={ig.name}
        style={{
            display:'inline-block',
            textTransform:'capitalize',
            border:'1px solid #ccc',
            margin:'0 8px',
            padding:'5px',
            boxSizing:'border-box'
        }}
        >
            {ig.name}:({ig.amount})
        </span>
    ))

    return(
        <div className={classes.Order}>
            <p>ingredients:{ingredientsOutput}</p>
            <p>price:<strong>USD {Number.parseFloat(props.price).toFixed(2)}</strong></p>
        </div>
    )
}
   

export default order;