import { ERROR_CLEAR, ALL_TOUR_SUCCESS, ALL_TOUR_FAIL, ALL_TOUR_REQUEST,
        TOUR_DETAIL_REQUEST,TOUR_DETAIL_SUCCESS,TOUR_DETAIL_FAIL } from "../constents/tourConstants";


import axios from "axios";

const URL = 'https://tourbookingapp.onrender.com'

export const getAllTour = (keyword=' ',currentPage= 1,category, sortBy='')=> async(dispatch)=>{
    try{
        dispatch({type: ALL_TOUR_REQUEST })
       // console.log(keyword);
        let link = `${URL}/api/v1/tours?${keyword}&page=${currentPage}&sort=${sortBy}`

        if(category){
            link = `${URL}/api/v1/tours?search=${keyword}&category=${category}`
        }

        const {data} = await axios.get(link);

        dispatch({
            type: ALL_TOUR_SUCCESS,
            payload:data.data
        })
    }catch(error){
        dispatch({
            type:ALL_TOUR_FAIL,
            payload:error.response.data.message
        })
    }
}

export const getTourDetail = (id) => async(dispatch)=>{
    try{
        dispatch({ type: TOUR_DETAIL_REQUEST})

        const {data} = await axios.get(`${URL}/api/v1/tours/${id}`)

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