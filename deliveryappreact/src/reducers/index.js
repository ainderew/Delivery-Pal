import {userDataReducer} from "./userData"
import {restaurantDataReducer} from "./restaurantData"
import {cartDataReducer} from "./cartData"
import {OrderStatusReducer} from "./OrderStatus"

import {combineReducers} from "redux"


export const combinedReducers = combineReducers({
    userDataReducer,
    restaurantDataReducer,
    cartDataReducer,
    OrderStatusReducer,
    
})