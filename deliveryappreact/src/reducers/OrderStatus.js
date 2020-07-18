export const OrderStatusReducer = (state=false, action) =>{
    switch (action.type){
        case "setOrderStatus":
            state = action.orderSate;
            return state;
        default:
            return state;
    }
}
