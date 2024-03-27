import { USER_REQUIEST,USER_SUCCESS,USER_ERROR, USER_FAIL ,
    USER_REGISTER_FAIL,USER_REGISTER_REQUIEST,USER_REGISTER_SUCCESS,
    LOAD_USER_REQUIEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
    USER_LOGOUT_REQUIEST,USER_LOGOUT_SUCCESS,USER_LOGOUT_FAIL } from "../Constents/userConstants";

import axios from "axios";
let URL = process.env.REACT_APP_PROD_URL
if(process.env.NODE_ENV ==='development'){
    URL = process.env.REACT_APP_DEV_URL
}

export const login =(email,password) => async(dispatch)=>{
    try{
        dispatch({type:USER_REQUIEST})
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${URL}/users/login`,{email,password},config);
        document.cookie = `jwt=${data?.token??null}`;
        window.localStorage.setItem('cookie',data?.token??null);
        dispatch({type:USER_SUCCESS , payload : data.data.user})
       
    }catch(error){
        dispatch({type:USER_FAIL, payload: error.response?.data?.message??"Something wrong hanpend"})
    }
};

export const signUp = (user)=> async(dispatch)=>{
    try{
        debugger
        dispatch({type:USER_REGISTER_REQUIEST})
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`${URL}/users/signUp`, user, config)
        dispatch({type:USER_REGISTER_SUCCESS, payload: data.data.user})
    }catch(error){
        dispatch({type:USER_REGISTER_FAIL, payload: error.response?.data.message??"Something wrong happend"})
    }
}

export const loadUser = ()=> async(dispatch)=>{
    try{
        dispatch({type: LOAD_USER_REQUIEST})
        const config = { 
            headers: {
                "authorization": `Bearer ${localStorage.getItem('cookie')}`, 
                "Content-Type": "application/json"
            },
            withCredentials:true
        };
        const { data } = await axios.get(`${URL}/users/me`,config)
        dispatch({type: LOAD_USER_SUCCESS, payload: data.data.data})
    }catch(error){
        dispatch({type:LOAD_USER_FAIL, payload: error.response?.data?.message??"Something wrong happen"})
    }
}

export const userLogout = () => async(dispatch)=>{
    try{
        
        const res = await axios.get(`${URL}/users/logout`,{ withCredentials: true })
        if(res.status){
            localStorage.removeItem('cookie')
        }
        dispatch({type: USER_LOGOUT_SUCCESS});
    }catch(error){
        dispatch({type: USER_LOGOUT_FAIL, payload:error.response.data.message})
    }
}
