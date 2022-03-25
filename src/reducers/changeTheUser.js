const initialState = {
  user: {},
};
const AdminState = {
  isAdmin: {},
};
const BasketState = {
  basket: [],
};
const WishListState = {
  wishlist: [],
};
export const ChangeTheUser = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,
        user: action.payload,
      };

    case "DELETE_USER":
      return { ...state, user: {} };
    default:
      return state;
  }
};
export const AdminChanger = (state = AdminState, action) => {
  switch (action.type) {
    case "ADD_ADMIN":
      return { ...state, isAdmin: action.payload };

    case "DELETE_ADMIN":
      return { ...state, isAdmin: [] };
    default:
      return state;
  }
};
export const OrderChanger = (state = WishListState, action) => {
  switch (action.type) {
    case "ADD_ORDER":
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    case "DELETE_ORDER":
      return { ...state, wishlist: [] };

    default:
      return state;
  }
};
