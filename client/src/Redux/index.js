import store from "./store";
import { userReducer } from "./Reducers/userReducer";
import { tourReducer } from "./Reducers/tourReducer";
import { getAllTour,getTourDetail,clearErrors } from "./Actions/tourAction";
import { login,signUp,loadUser,userLogout } from "./Actions/userAction";
export {
    store,userReducer,tourReducer,
    getAllTour,getTourDetail,clearErrors,
    login,signUp,loadUser,userLogout        
};