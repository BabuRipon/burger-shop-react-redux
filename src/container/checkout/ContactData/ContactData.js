import React,{Component}from 'react';
import Button from '../../../Ui/button/button';
import classes from './ContactData.module.css';
import axios from '../../../axios-order';
import Spinner from '../../../Ui/spinner/spinner';
import Input from '../../../Ui/input/input';
import {connect}from 'react-redux'


class ContactData extends Component{

    state={
        orderForm:{
            name:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:'Your Name'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:30
                },
                valid:false,
                touched:false,
            },
            street:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:'Your Street'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:30
                },
                valid:false,
                touched:false,
            },
            zipCode:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:'Your Zip-Code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:30
                },
                valid:false,
                touched:false,
            },
            country:{
                elementType:'input',
                elementConfig:{
                    type:"text",
                    placeholder:'Country'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:30
                },
                valid:false,
                touched:false,
            },
            email:{
                elementType:'input',
                elementConfig:{
                    type:"email",
                    placeholder:'Your E-Mail'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:3,
                    maxLength:30
                },
                valid:false,
                touched:false,
            },
            deliveryMode:{
                elementType:'select',
                elementConfig:{
                    options:[
                        {value:'fastest',displayValue:'Fastest'},
                        {value:'cheapest',displayValue:'Cheapest'},
                ]
                },
                value:'fastest',
                validation:{},
                valid:true,
            }
        },
        isFormValid:false,
        loading:false,
    }

    orederHandler=(event)=>{
        event.preventDefault();
    //    console.log(this.props.ingredients)

       this.setState({loading:true});

       let orderFormData={};

       for(let key in this.state.orderForm){
           orderFormData[key]=this.state.orderForm[key].value;
       }

       const orderData={
           ingredients:this.props.ing,
           price:this.props.price,
           customer:orderFormData,   
       }
   
       axios.post('/orders.json',orderData)
       .then(res=>{
           console.log(res);
           this.setState({loading:false})
           this.props.history.push('/');
       })
       .catch(err=>{
           console.log(err);
           this.setState({loading:false});
       })

    }

    checkValidity(value,rules){
        let isValid=true;
        
        if(rules.required){
          isValid=value.trim()!=='' && isValid
        }

        if(rules.minLength){
            isValid= value.trim().length >= rules.minLength && isValid
          }

        if(rules.maxLength){
            isValid= value.trim().length <= rules.maxLength && isValid
        }

        return isValid;
    }

    inputChangeHandler=(event,identifier)=>{
        const updatedForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedForm[identifier]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedForm[identifier]=updatedFormElement;
        // console.log(updatedFormElement);

        let isFormValid=true;

        for(let key in updatedForm){
            isFormValid=updatedForm[key].valid && isFormValid;
        }

        this.setState({orderForm:updatedForm,isFormValid:isFormValid})
    }

  render(){

    const formElementArray=[];

    for(let key in this.state.orderForm){
        formElementArray.push({
            id:key,
            config:this.state.orderForm[key]
        })
    }
      
      let form=( <form onSubmit={this.orederHandler} >
        {
            formElementArray.map(item=>(
                <Input 
                key={item.id}
                elementType={item.config.elementType}
                elementConfig={item.config.elementConfig}
                value={item.config.value}
                invalid={!item.config.valid}
                touched={item.config.touched}
                shouldValidate={item.config.validation}
                changed={(event)=>{this.inputChangeHandler(event,item.id)}}
                />
            ))
        }
        <Button btnType="Success" disabled={!this.state.isFormValid}>ORDER</Button>
    </form>)

      if(this.state.loading){
          form=<Spinner />
      }
      return(
          <div className={classes.ContactData}>
             <h3>Enter your contact data</h3>
            {form}
          </div>
      )
  }
}

const mapStateToProps=(state)=>{
    return{
        ing:state.ingredients,
         price:state.totalPrice
    }
}

export default connect(mapStateToProps)(ContactData);