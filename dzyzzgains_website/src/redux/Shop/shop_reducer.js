import {
  ADD_TO_CART,
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADJUST_QTY,
  ADD_REMOVE_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
} from "./shop_types";
import { REHYDRATE } from "redux-persist";

const INITIAL_STATE = {
  products: [],
  isLoadingProducts: false,
  productsAddedToCart: [],
  productsAddedToFavourite: [],
  isAddedToFavourite: false,
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
        productsAddedToFavourite: action.payload
          ? action.payload.shopReducer.productsAddedToFavourite
          : [],
      };
    }
    case ADD_TO_CART: {
      const item = action.item;
      const inCart = state.productsAddedToCart.find(
        (item) => item.id === action.item.id
      )
        ? true
        : false;

      return {
        ...state,
        productsAddedToCart: inCart
          ? state.productsAddedToCart.map((item) =>
              item.id === action.item.id ? { ...item, qty: item.qty + 1 } : item
            )
          : [
              ...state.productsAddedToCart,
              { ...item, qty: 1, isAddedToCart: true },
            ],
      };
    }
    case REMOVE_FROM_CART: {
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
          item.id === action.item.id ? { ...item, qty: +action.value } : item
        ),
      };
    }

    case ADD_REMOVE_FAVOURITES: {
      const item = action.item;
      const inFavourite = state.productsAddedToFavourite.find(
        (item) => item.id === action.item.id
      )
        ? true
        : false;

      return {
        ...state,
        productsAddedToFavourite: inFavourite
          ? state.productsAddedToFavourite.filter(
              (removedItem) => removedItem.id !== item.id
            )
          : [
              ...state.productsAddedToFavourite,
              { ...item, isAddedToFavourite: true },
            ],
      };
    }

    case REMOVE_FROM_FAVOURITES: {
      const itemId = action.item.id;
      return {
        ...state,
        productsAddedToFavourite: state.productsAddedToFavourite.filter((x) =>
          x.id !== itemId ? { ...x, isAddedToFavourite: false } : x
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
