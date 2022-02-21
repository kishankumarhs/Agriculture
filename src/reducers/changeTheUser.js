const initialState = {
    user: {},
    basket: [],
    wishlist: [],
    isAdmin:{},
}
export const ChangeTheUser = (state = initialState, action) => {
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                user: action.payload
            }

        case "DELETE_USER":
            return { ...state, user: {} }
        default:
            return state

    }
}
export const AdminChanger = (state = initialState,action)=>{
    switch (action.type) {
        case "ADD_ADMIN":
            return {...state , isAdmin:action.payload}
            
        case "DELETE_ADMIN":
        return {...state ,isAdmin:[]}
        default:
        return state;
            
    }
}
export const OrderChanger = (state = initialState,action)=>{
    switch (action.type) {
        case "ADD_ORDER":
            return {...state , basket :[...state.basket , action.payload]}
        case "DELETE_ORDER":
            return {...state , basket : []}
    
        default:
        return state
            
    }
}
