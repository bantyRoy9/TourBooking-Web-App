import { ERROR_CLEAR, ALL_TOUR_SUCCESS, ALL_TOUR_FAIL, ALL_TOUR_REQUEST,
        TOUR_DETAIL_REQUEST,TOUR_DETAIL_SUCCESS,TOUR_DETAIL_FAIL } from "../constents/tourConstants";


import axios from "axios";

let URL = "http://13.201.91.13:3000/api2/v1"
if(process.env.NODE_ENV ==='development'){
    URL = process.env.REACT_APP_DEV_URL
}

export const getAllTour = (keyword='',currentPage= 1,category, sortBy='')=> async(dispatch)=>{
    try{
        dispatch({type: ALL_TOUR_REQUEST })
        let link = `${URL}/tours?${keyword}&page=${currentPage}&sort=${sortBy}`
        if(category){
            link = `${URL}/tours?search=${keyword}&category=${category}`
        }
        const {data} = await axios.get(link);
        dispatch({
            type: ALL_TOUR_SUCCESS,
            payload:data.data
        })
    }catch(error){
        dispatch({
            type:ALL_TOUR_FAIL,
            payload:error?.response.data?.message
        })
    }
}

export const getTourDetail = (id) => async(dispatch)=>{
    try{
        dispatch({ type: TOUR_DETAIL_REQUEST})

        const {data} = await axios.get(`${URL}/tours/${id}`)

        dispatch({
            type:TOUR_DETAIL_SUCCESS,
            payload:data.data
        })
    }catch(error){
        dispatch({
            type: TOUR_DETAIL_FAIL,
            payload:error.response.data.message
        })
    }
}

export const clearErrors = ()=> async(dispatch)=>{
    dispatch({
        type:ERROR_CLEAR
    })
}
