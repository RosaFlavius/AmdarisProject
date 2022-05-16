import { combineReducers } from "redux";
import shoppingReducer from "./Shop/shop_reducer";

const rootReducer = combineReducers({

    shopReducer: shoppingReducer,
});

export default rootReducer;