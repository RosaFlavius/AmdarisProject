import {
  ADD_TO_CART,
  ADD_REMOVE_WISHLIST,
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADJUST_QTY,
  ADD_REMOVE_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  REMOVE_FROM_WISHLIST,
} from "./shop_types";
import axios from "axios";

const BASE_URL = "https://localhost:7177/api/";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = () => {
  return async (dispatch) => {
    dispatch({ type: FETCHING_PRODUCTS });

    var result = await axios.get("https://localhost:7177/api/Clothes");
    const clothes = result.data;

    result = await axios.get("https://localhost:7177/api/Equipment");
    const equipment = result.data;

    result = await axios.get("https://localhost:7177/api/Supplement");
    const supplement = result.data;

    const products = [].concat(clothes, equipment, supplement);

    dispatch({ type: FETCHING_PRODUCTS_SUCCESS, products });
  };
};

export const addToCart = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_TO_CART, item });
  };
};

export const addRemoveWishlist = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_REMOVE_WISHLIST, item });
  };
};

export const removeFromWishlist = (item) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_WISHLIST, item });
  };
};

export const addRemoveFavourite = (item) => {
  return (dispatch) => {
    dispatch({ type: ADD_REMOVE_FAVOURITES, item });
  };
};

export const removeFromFavourites = (item) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_FAVOURITES, item });
  };
};

export const removeFromCart = (item) => {
  return (dispatch) => {
    dispatch({ type: REMOVE_FROM_CART, item });
  };
};

export const removeAllFromCart = () => {
  return (dispatch) => {
    dispatch({ type: REMOVE_ALL_FROM_CART });
  };
};

export const adjustQty = (item, value) => {
  return (dispatch) => {
    dispatch({ type: ADJUST_QTY, item, value });
  };
};
