import { USER_REQUIEST,USER_SUCCESS,USER_ERROR, USER_FAIL ,
         USER_REGISTER_FAIL,USER_REGISTER_REQUIEST,USER_REGISTER_SUCCESS,
         LOAD_USER_REQUIEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
         USER_LOGOUT_REQUIEST,USER_LOGOUT_SUCCESS,USER_LOGOUT_FAIL } from "../constents/userConstants";

export const userReducer = (state={ user:{}}, action)=>{
    switch (action.type) {
        case USER_REQUIEST:
        case USER_REGISTER_REQUIEST:
        case LOAD_USER_REQUIEST:
            return{
                loading: true,
                isAuthenticated: false
            };
        case USER_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading:false,
                isAuthenticated:true,
                user:action.payload
            };

        case USER_LOGOUT_SUCCESS:
            return{
                loading:false,
                isAuthenticated:false,
                user:null
            }
        case USER_FAIL:
        case USER_REGISTER_FAIL:
            return{
                ...state,
                isAuthenticated:false,
                user:null,
                error:action.payload
            };
        case USER_LOGOUT_FAIL:
            return{
                ...state,
                loading:false,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return{
                isAuthenticated:false,
                user:null,
                error:action.payload
            }    

        case USER_ERROR:
            return{
                ...state,
                error:null
            }    
        default:
        return state;   
    }

}