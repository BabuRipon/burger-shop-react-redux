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

              localStorage.setItem('token',res.data.idToken)
              const expirationDate=new Date(new Date().getTime()+res.data.expiresIn*1000);
              localStorage.setItem('expirationDate',expirationDate)
              localStorage.setItem('userId',res.data.localId)

              dispatch(authSuccess(res.data))
              dispatch(tokenExpirationTime(res.data.expiresIn))
          })
          .catch(err=>{
             console.log(err.response.data.error)
             dispatch(authFailed(err.response.data.error))
          })
    }
}

export const  logOut=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationDate')

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

export const authRedirectToPath=(path)=>{
    return{
        type:actionType.AUTH_REDIRECT_PATH,
        path:path
    }
}

export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token');
        if(!token){
            dispatch(logOut());
        }else{
            const expirationDate=new Date(localStorage.getItem('expirationDate'))
            if(expirationDate>new Date()){
                const localId=localStorage.getItem('userId');
                dispatch(authSuccess({idToken:token,localId:localId}));
                dispatch(tokenExpirationTime((expirationDate.getTime()-new Date().getTime())/1000));
            }else{
                dispatch(logOut());
            }
        }
    }
}
