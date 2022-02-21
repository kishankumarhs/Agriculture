export const addUser = (payload) => {
    return { type: "ADD_USER", payload }
}
export const deleteUser = (num) => {
    return { type: "DELETE_USER" }
} 

export const addAdmin = (payload)=>{
    return {type:"ADD_ADMIN",payload}
}


export const deleteAdmin = ()=>{
    return {type:"DELETE_ADMIN"}
}
export const addProductsToBasket = (payload)=>{
    return {type:"ADD_ORDER",payload}
}
export const DeleteProductsaFromBasket = (payload)=>{
    return {type:"DELETE_ORDER",payload}
}
