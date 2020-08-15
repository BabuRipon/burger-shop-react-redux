import * as actionType from '../action/actionType';
import {updateObject} from '../utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    authRedirectPath:'/'
}

const authStart=(state,action)=>{
    return updateObject(state,{loading:true,error:null})
}

const authSuccess=(state,action)=>{
    return updateObject(state,{
        token:action.idToken,
        userId:action.localId,
        loading:false,
        error:null
    })
}

const authFailed=(state,action)=>{
    return updateObject(state,{
        loading:false,
        error:action.error
    })
}

const authLogout=(state,action)=>{
    return updateObject(state,{userId:null,token:null})
}

const authRedirectPath=(state,action)=>{
    return updateObject(state,{
        authRedirectPath:action.path,
    })
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case actionType.AUTH_START:return authStart(state,action);
        case actionType.AUTH_SUCCESS:return authSuccess(state,action);
        case actionType.AUTH_FAILED:return authFailed(state,action);
        case actionType.AUTH_LOGOUT:return authLogout(state,action);
        case actionType.AUTH_REDIRECT_PATH:return authRedirectPath(state,action);
        default:return state;
    }
}

export default reducer;