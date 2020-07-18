export const userDataReducer = (state="",action) =>{
    switch (action.type){
        case "storeUserData":
            state = action.userData;
            return state;
        default:
            return state;
    }
}