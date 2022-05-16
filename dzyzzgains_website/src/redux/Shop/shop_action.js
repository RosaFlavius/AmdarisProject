import {
  ADD_TO_CART,
  FETCHING_PRODUCTS,
  FETCHING_PRODUCTS_SUCCESS,
  REMOVE_FROM_CART,
  REMOVE_ALL_FROM_CART,
  ADJUST_QTY,
} from "./shop_types";
import axios from "axios";



export const fetchProducts = () => {
  return async (dispatch, getState) => {
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

export const addToCart = (itemId) => {
  return (dispatch, getState) => {
    dispatch({ type: ADD_TO_CART, itemId });
  };
};

export const removeFromCart = (itemId) => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_FROM_CART, itemId });
  };
};

export const removeAllFromCart = () => {
  return (dispatch, getState) => {
    dispatch({ type: REMOVE_ALL_FROM_CART });
  };
};

export const adjustQty = (itemId, value) => {
  return (dispatch, getState) => {
    dispatch({ type: ADJUST_QTY, itemId, value });
  };
};
