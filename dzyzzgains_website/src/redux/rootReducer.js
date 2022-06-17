import { combineReducers } from "redux";
import shopReducer from "./Shop/shop_reducer";
import userReducer from "./User/user_reducers";

const products = combineReducers({
  shopReducer,
  userReducer,
});

export default products;
