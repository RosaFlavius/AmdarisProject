import {
    ADD_TO_CART,
    FETCHING_PRODUCTS,
    FETCHING_PRODUCTS_SUCCESS,
    REMOVE_FROM_CART,
    REMOVE_ALL_FROM_CART,
    ADJUST_QTY,
  } from "./shop_types";
  import { REHYDRATE } from "redux-persist";
  
  const INITIAL_STATE = {
    products: [],
    isLoadingProducts: false,
    productsAddedToCart: [],
    isAddedToCart: false,
  };
  
  const shopReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
      case REHYDRATE: {
        return {
          ...INITIAL_STATE,
          productsAddedToCart: action.payload
            ? action.payload.shopReducer.productsAddedToCart
            : [],
        };
      }
      case ADD_TO_CART: {
        const item = action.item;
        console.log("Id " + action.item.id);
        const inCart = state.productsAddedToCart.find((item) =>
          item.id === action.item.id) ? true : false;
        
        return {
          ...state,
          productsAddedToCart: inCart
            ? state.productsAddedToCart.map((item) =>
                item.id === action.item.id
                  ? { ...item, qty: item.qty + 1 }
                  : item  
              )
            : [...state.productsAddedToCart, { ...item, qty: 1, isAddedToCart: true }],
        };
      }
      case REMOVE_FROM_CART: {
        console.log("Remove state");
        const itemId = action.item.id;
        return {
          ...state,
          productsAddedToCart: state.productsAddedToCart.filter(
            (x) => x.id !== itemId
          ),
        };
      }
      case REMOVE_ALL_FROM_CART: {
        return {
          ...state,
          productsAddedToCart: [],
        };
      }
      case ADJUST_QTY: {
        return {
          ...state,
          productsAddedToCart: state.productsAddedToCart.map((item) =>
            item.id === action.item.id
              ? { ...item, qty: +action.value }
              : item
          ),
        };
      }

      case FETCHING_PRODUCTS:
        return {
          ...state,
          isLoadingProducts: true,
        };
      case FETCHING_PRODUCTS_SUCCESS: {
        const products = action.products;
        return {
          ...state,
          isLoadingProducts: false,
          products,
        };
      }
      default:
        return state;
    }
  };
  
  export default shopReducer;