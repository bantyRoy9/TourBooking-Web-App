import { ERROR_CLEAR, ALL_TOUR_SUCCESS, ALL_TOUR_FAIL, ALL_TOUR_REQUEST,
    TOUR_DETAIL_SUCCESS,TOUR_DETAIL_REQUEST,TOUR_DETAIL_FAIL } from "../constents/tourConstants";

export const tourReducer = (state={ tours : []}, action)=>{

    switch (action.type) {
        case ALL_TOUR_REQUEST:
            return{
                loading: true,
                tours:[]
            }            
    
        case ALL_TOUR_SUCCESS:
            return{
                loading: false,
                tours:action.payload.AllTours,
                length:action.payload.length,
                resultPerpage:action.payload.resultPerpage

            }            
    
        case ALL_TOUR_FAIL:
            return{
                loading: false,
                error:action.payload
            }            
    
    
        case ERROR_CLEAR:
            return{
                ...state,
                error:null,
            }            
    
        default:
            return state
    }
}

export const tourDetailReducer = (state = { tour : { } }, action)=>{

    switch(action.type){
        case TOUR_DETAIL_REQUEST:
            return {
                loading:true,
                ...state
            }
        case TOUR_DETAIL_SUCCESS:
            return{
                loading: false,
                tour: action.payload.data
            }
   
        case TOUR_DETAIL_FAIL:
            return{
                loading:false,
                error:action.payload
            }
        case ERROR_CLEAR:
            return{
                ...state,
                error:null
            }
        default:
            return state
            }  
};