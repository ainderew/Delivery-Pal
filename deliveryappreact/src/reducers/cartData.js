export const cartDataReducer = (state={restaurantName:"", orders: []},action) =>{
    switch (action.type){
        case "cartData":
            state = {
                restaurantName: action.cartData.restaurantName,
                orders: [...state.orders, action.cartData.orders]
            };
            return state;
        case "clearCartData":
            state = {
                restaurantName: "",
                orders: []
            };
            return state;
        default:
            return state;
    }
}
