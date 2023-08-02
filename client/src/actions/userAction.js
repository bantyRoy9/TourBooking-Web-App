import { USER_REQUIEST,USER_SUCCESS,USER_ERROR, USER_FAIL ,
    USER_REGISTER_FAIL,USER_REGISTER_REQUIEST,USER_REGISTER_SUCCESS,
    LOAD_USER_REQUIEST,LOAD_USER_SUCCESS,LOAD_USER_FAIL,
    USER_LOGOUT_REQUIEST,USER_LOGOUT_SUCCESS,USER_LOGOUT_FAIL } from "../constents/userConstants";

import axios from "axios";
const URL = 'https://tourbookingapp.onrender.com'
// const URL = 'http://localhost:8000'


export const login =(email,password) => async(dispatch)=>{
    try{
        dispatch({type:USER_REQUIEST})

        const config = { headers: { "Content-Type": "application/json" } };


        const { data } = await axios.post(`${URL}/api/v1/users/login`,{email,password},config);

        dispatch({type:USER_SUCCESS , payload : data.data.user})
       
    }catch(error){
        dispatch({type:USER_FAIL, payload: error.response.data.message})
    }
};

export const signUp = (user)=> async(dispatch)=>{
    // console.log(user);
    try{
        dispatch({type:USER_REGISTER_REQUIEST})
        // const config = { headers: {"Content-Type":"multipart/form-data"}}
        const config = { headers: { "Content-Type": "application/json" } };


        const { data } = await axios.post(`${URL}/api/v1/users/signUp`, user, config)

        dispatch({type:USER_REGISTER_SUCCESS, payload: data.data.user})



    }catch(error){
        dispatch({type:USER_REGISTER_FAIL, payload: error.response.data.message})
    }
}

export const  loadUser = ()=> async(dispatch)=>{
    try{
        dispatch({type: LOAD_USER_REQUIEST})

        const { data } = await axios.get(`${URL}/api/v1/users/me`)

        dispatch({type: LOAD_USER_SUCCESS, payload: data.data.data})

    }catch(error){
        dispatch({type:LOAD_USER_FAIL, payload: error.response.data.message})
    }
}

export const userLogout = () => async(dispatch)=>{
    try{
        await axios.get(`${URL}/api/v1/users/logout`)

        dispatch({type: USER_LOGOUT_SUCCESS});
    }catch(error){
        dispatch({type: USER_LOGOUT_FAIL, payload:error.response.data.message})
    }
}