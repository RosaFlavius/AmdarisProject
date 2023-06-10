import { LOG_IN, LOG_OUT } from "./user_types";

import { REHYDRATE } from "redux-persist";

const INITIAL_STATE = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  dateOfBirth: "",
  phone: "",
  country: "",
  city: "",
  address: "",
  admin: false,
  isLoggedIn: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REHYDRATE: {
      return {
        ...INITIAL_STATE,
        userId: action.payload ? action.payload.userReducer.userId : "",
        firstName: action.payload ? action.payload.userReducer.firstName : "",
        lastName: action.payload ? action.payload.userReducer.lastName : "",
        email: action.payload ? action.payload.userReducer.email : "",
        dateOfBirth: action.payload
          ? action.payload.userReducer.dateOfBirth
          : "",
        phone: action.payload ? action.payload.userReducer.phone : "",
        country: action.payload ? action.payload.userReducer.country : "",
        city: action.payload ? action.payload.userReducer.city : "",
        address: action.payload ? action.payload.userReducer.address : "",
        isLoggedIn: action.payload
          ? action.payload.userReducer.isLoggedIn
          : false,
        admin: action.payload ? action.payload.userReducer.admin : false,
      };
    }
    case LOG_IN: {
      const userId = action.userId;
      const userFirstName = action.firstName;
      const userLastName = action.lastName;
      const userEmail = action.email;
      const userDateOfBirth = action.dateOfBirth;
      const userPhone = action.phone;
      const userCountry = action.country;
      const userCity = action.city;
      const userAddress = action.address;
      const userAdmin = action.admin;
      return {
        ...state,
        userId: userId,
        firstName: userFirstName,
        lastName: userLastName,
        email: userEmail,
        dateOfBirth: userDateOfBirth,
        phone: userPhone,
        country: userCountry,
        city: userCity,
        address: userAddress,
        isLoggedIn: true,
        admin: userAdmin,
      };
    }
    case LOG_OUT: {
      return {
        ...state,
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        dateOfBirth: "",
        phone: "",
        country: "",
        city: "",
        address: "",
        admin: false,
        isLoggedIn: false,
      };
    }
    default:
      return state;
  }
};

export default userReducer;
