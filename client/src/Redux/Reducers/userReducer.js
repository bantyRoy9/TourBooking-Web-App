import {
    USER_REQUIEST, USER_SUCCESS, USER_ERROR, USER_FAIL,
    USER_REGISTER_FAIL, USER_REGISTER_REQUIEST, USER_REGISTER_SUCCESS,
    LOAD_USER_REQUIEST, LOAD_USER_SUCCESS, LOAD_USER_FAIL,
    USER_LOGOUT_REQUIEST, USER_LOGOUT_SUCCESS, USER_LOGOUT_FAIL
} from "../Constents/userConstants";

const initialState = { loading: false, isAuthenticated: false, user: null, error: null }
export const userReducer = (state = { user: initialState }, action) => {
    switch (action.type) {
        case USER_REQUIEST:
        case USER_REGISTER_REQUIEST:
        case LOAD_USER_REQUIEST:
            return {
                ...initialState,
                loading: true,
                isAuthenticated: false
            };
        case USER_SUCCESS:
        case USER_REGISTER_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...initialState,
                isAuthenticated: true,
                user: action.payload
            };

        case USER_LOGOUT_SUCCESS:
            return {
                ...initialState
            }
        case USER_FAIL:
        case USER_REGISTER_FAIL:
            return {
                ...initialState,
                error: action.payload
            };
        case USER_LOGOUT_FAIL:
            return {
                ...initialState,
                error: action.payload
            }
        case LOAD_USER_FAIL:
            return {
                ...initialState,
                error: action.payload
            }

        case USER_ERROR:
            return {
                ...initialState
            }
        default:
            return state;
    }

}