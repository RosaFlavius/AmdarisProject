import { LOG_IN, LOG_OUT } from "./user_types";

export const logIn = (
  userId,
  firstName,
  lastName,
  email,
  dateOfBirth,
  phone,
  country,
  city,
  address,
  admin
) => {
  return (dispatch, getState) => {
    dispatch({
      type: LOG_IN,
      userId,
      firstName,
      lastName,
      email,
      dateOfBirth,
      phone,
      country,
      city,
      address,
      admin,
    });
  };
};

export const logOut = (email) => {
  return (dispatch, getState) => {
    dispatch({ type: LOG_OUT, email });
  };
};
