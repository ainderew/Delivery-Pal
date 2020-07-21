export const restaurantDataReducer = (state="",action) =>{
    switch (action.type){
        case "storeRestaurantData":
            state = action.restaurantData;
            return state;
        default:
            return state;
    }
}

