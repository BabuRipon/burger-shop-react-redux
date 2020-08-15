import * as actionType from './actionType';
import axios from 'axios';

const authStart=()=>{
    return {
        type:actionType.AUTH_START
    }
}

const authFailed=(err)=>{
    return {
        type:actionType.AUTH_FAILED,
        error:err
    }
}

const authSuccess=(data)=>{
    return {
        type:actionType.AUTH_SUCCESS,
        idToken:data.idToken,
        localId:data.localId
    }
}

export const auth=(email,password,isSignUp)=>{
    return dispatch=>{
        dispatch(authStart())
        const postData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA6uS4J_DzJ3GB7DpimzfcPjrlmb7Hj4hU'
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA6uS4J_DzJ3GB7DpimzfcPjrlmb7Hj4hU'
        }
        axios.post(url,postData)
          .then(res=>{
              console.log(res.data);
              dispatch(authSuccess(res.data))
              dispatch(tokenExpirationTime(res.data.expiresIn))
          })
          .catch(err=>{
             console.log(err.response.data.error)
             dispatch(authFailed(err.response.data.error))
          })
    }
}

const  logOut=()=>{
    return {
        type:actionType.AUTH_LOGOUT
    }
}

export const tokenExpirationTime=(time)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logOut())
        },time*1000)
    }
}


//AIzaSyA6uS4J_DzJ3GB7DpimzfcPjrlmb7Hj4hU