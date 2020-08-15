import React,{Component} from 'react';
import Input from '../../Ui/input/input';
import classes from './auth.module.css';
import Button from '../../Ui/button/button';
import * as actionCreator from '../../store/action/index'
import {connect} from 'react-redux';
import Spinner from '../../Ui/spinner/spinner';
import { Redirect } from 'react-router-dom';


class Auth extends Component{


    componentDidMount(){
        if(!this.props.burgerBuilding && this.props.authRedirectPath!=='/'){
            this.props.onSetAuthRedirectPath();
        }
    }

    state={
        controls:{
            email:{
                elementType:'input',
                elementConfig:{
                    type:"email",
                    placeholder:'E-mail Address'
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
            password:{
                elementType:'input',
                elementConfig:{
                    type:"password",
                    placeholder:'Password'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:7,
                    maxLength:30
                },
                valid:false,
                touched:false,
            }
        },
        isSignUp:true
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
            ...this.state.controls
        }
        const updatedFormElement={
            ...updatedForm[identifier]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        updatedForm[identifier]=updatedFormElement;

        this.setState({controls:updatedForm})
    }

    onSubmitHandler=(event)=>{
        event.preventDefault();
        this.props.onAuthHandling(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp)
    }

    switchToHandle=()=>{
        this.setState(preState=>{
            return {isSignUp:!preState.isSignUp}
        })
    }

    render(){

        const formElementArray=[];

        for(let key in this.state.controls){
            formElementArray.push({
                id:key,
                config:this.state.controls[key]
            })
        }
          
          let form=( <form onSubmit={this.onSubmitHandler} >
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
            <Button btnType="Success" >Submit</Button>
        </form>)

        if(this.props.loading){
            form=<Spinner />
        }

        let errorMessage=null;

        if(this.props.error){
           errorMessage=<p className={classes.ErrorMessage}>{this.props.error.message}</p>
        }

        let redirectToHome=null;
        if(this.props.isAuthenticate){
            redirectToHome=<Redirect to={this.props.authRedirectPath} />
        }

        return(
            <div className={classes.ContactData}>
                <h3>{this.state.isSignUp?'sign-up':'sign-in'}</h3>
                {redirectToHome}
                 {errorMessage}
                 {form}
                <Button clicked={this.switchToHandle} btnType="Danger" >Switch to {this.state.isSignUp?'sign-in':'sign-up'}</Button>
            </div>
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        loading:state.auth.loading,
        error:state.auth.error,
        isAuthenticate:state.auth.token!==null,
        burgerBuilding:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        onAuthHandling:(email,password,isSignUp)=>dispatch(actionCreator.auth(email,password,isSignUp)),
        onSetAuthRedirectPath:()=>dispatch(actionCreator.authRedirectToPath('/'))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);