export const cartDataReducer = (state={restaurantName:"", orders: []},action) =>{
    switch (action.type){
        case "cartData":
            state = {
                restaurantName: action.cartData.restaurantName,
                orders: [...state.orders, action.cartData.orders],
                changes: 0
            };
            return state;
        case "clearCartData":
            state = {
                restaurantName: "",
                orders: []
            };
            return state;
        case "updateCartData":
            state = action.UpdatedCart;
            return state;
        default:
            return state;
    }
}

