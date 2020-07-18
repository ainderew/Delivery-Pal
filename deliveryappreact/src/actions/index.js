export const storeUser = (data) =>{
    return{
        type: "storeUserData",
        userData: data
    }
}
export const restaurantData = (data) =>{
    return{
        type: "storeRestaurantData",
        restaurantData: data
    }
}
export const cartData = (cartData) =>{
    return{
        type: "cartData",
        cartData: cartData
    }
}

export const userData = (userData) =>{
    return{
        type: "storeUserData",
        userData: userData
    }
}

export const orderState = (orderState) =>{
    return{
        type: "setOrderStatus",
        orderSate: orderState
    }
}
export const clearCartData = () =>{
    return{
        type: "clearCartData",
    }
}

