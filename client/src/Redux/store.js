import { createStore, combineReducers, applyMiddleware } from 'redux'

import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { tourDetailReducer, tourReducer } from './Reducers/tourReducer';
import { userReducer } from './Reducers/userReducer';

const reducers = combineReducers({
    tours:tourReducer,
    tour:tourDetailReducer,
    user:userReducer,
})
const initialState = {};
const middleware = [thunk]

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store