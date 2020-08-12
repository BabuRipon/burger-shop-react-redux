import  React from 'react';
import BurgerIngredient from './burgerIngredient/burgerIngredient';
import classes from './burger.module.css';

const burger=(props)=>{

    let TransformIngredients=Object.keys(props.ingredients)
    .map(igKey=>{
        return [...Array(props.ingredients[igKey])].map((_,index)=>{
            return <BurgerIngredient type={igKey} key={igKey+index}/>
        })
    })
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[])

    // console.log(TransformIngredients)
    if(TransformIngredients.length===0){
        TransformIngredients=<p>plase add ingredients for your burger</p>
    }

    return(
        <div className={classes.Burger}>
              <BurgerIngredient type="bread-top" />
                {TransformIngredients}
              <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default burger;
