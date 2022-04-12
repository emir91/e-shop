import { CART_ADD_ITEM } from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload

      const exsistItem = state.cartItems.find((x) => x.product === item.product)

      if (exsistItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === exsistItem.product ? item : x
          ),
        }
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        }
      }
    default:
      return state
  }
}