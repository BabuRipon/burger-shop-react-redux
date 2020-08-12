import React from 'react';
import classes from './input.module.css';

const input=(props)=>{

    let inputElement=null;
    let errorMessage=null;

    const inputClasses=[classes.InputElement]
    if(props.invalid && props.shouldValidate &&props.touched){
     errorMessage=<p className={classes.ErrorMessage}>please enter the data</p>
     inputClasses.push(classes.Invalid)
    }

    switch(props.elementType){
        case ('input'):
            inputElement=<input 
            {...props.elementConfig} 
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}
            />
            break;
        case ('textarea'):
            inputElement=<textarea 
            {...props.elementConfig} 
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}
            />
            break;
        case ('select'):
            inputElement=<select
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}>
             {
                 props.elementConfig.options.map(item=>(
                     <option key={item.value} value={item.value}>
                        {item.displayValue}
                     </option>
                 ))
             }
            </select>
            break;
        default:
            inputElement=<input 
            {...props.elementConfig} 
            className={inputClasses.join(' ')}
            value={props.value}
            onChange={props.changed}/>
    }

    return(
        <div className={classes.Input}>
            <label className={classes.Label}> {props.label}</label>
            {inputElement}
            {errorMessage}
        </div>
    )
}

export default input;