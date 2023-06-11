import React from "react";
import { useState } from "react";
import { FormHelperText } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logIn } from "../../redux/User/user_actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./login.styles.css";
import { useFormik } from "formik";
import { loginSchema } from "../../validations/loginSchema.tsx";
import { registerSchema } from "../../validations/registerSchema.tsx";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Login = ({ logIn }) => {
  const [existantEmail, setExistantEmail] = useState(true);
  const [checkedPassword, setCheckedPassword] = useState(false);

  const formikLogin = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      handleSubmitLogin(values);
    },
  });

  const formikRegister = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      handleSubmitSignUp(values);
    },
  });

  const navigate = useNavigate();

  const validateExistantEmail = async (email) => {
    let response;
    let existantEmail;
    try {
      response = await axios.get(
        "https://localhost:7177/api/User/users/" + `${email}`
      );
      if (response.data) {
        existantEmail = true;
      }
    } catch (e) {
      existantEmail = false;
    } finally {
      setExistantEmail(existantEmail);
      return existantEmail;
    }
  };

  const checkPassword = async (email, password) => {
    let response;
    try {
      response = await axios.get(
        "https://localhost:7177/api/User/users/" + `${email}`
      );
      if (response.data) {
        if (password === response.data.password) {
          return true;
        }
      }
    } catch (e) {
      return false;
    }
    toast.error("Password doesn't match the account!", {
      position: "top-center",
      autoClose: 1000,
    });
    return false;
  };

  const notify = (response, type) => {
    if (type === "login") {
      if (response) {
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } else {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    } else if (type === "register") {
      if (response) {
        toast.success("Register successful!", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      } else {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      }
    }
  };

  const handleSubmitLogin = async (data) => {
    const emailValidation = await validateExistantEmail(data.email);
    const passwordChecked = await checkPassword(data.email, data.password);
    if (!emailValidation) {
      setExistantEmail(false);
      return;
    }
    if (!passwordChecked) {
      setCheckedPassword(false);
      return;
    }
    const response = await axios
      .get("https://localhost:7177/api/User/users/" + `${data.email}`)
      .catch((e) => {
        toast.error("Something went wrong.", {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 1000,
        });
      });
    logIn(
      response.data.firstName,
      response.data.lastName,
      response.data.email,
      response.data.dateOfBirth,
      response.data.phone,
      response.data.country,
      response.data.city,
      response.data.address,
      response.data.admin
    );
    notify(true, "login");
    // setTimeout(() => {
    //   if (response.data.admin) {
    //     navigate("/admin");
    //   } else {
    //     navigate("/");
    //   }
    // }, 1000);
  };

  const handleSubmitSignUp = async (data) => {
    let sw = true;
    const emailExistant = await validateExistantEmail(data.email);
    if (emailExistant) {
      setExistantEmail(true);
      sw = false;
      toast.error("This email already exists", {
        position: "top-center",
        autoClose: 2000,
      });
      return;
    }

    if (sw) {
      setExistantEmail(false);
      const response = await axios
        .post("https://localhost:7177/api/User", {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          dateOfBirth: data.dateOfBirth,
          phone: data.phone,
          country: data.country,
          city: data.city,
          address: data.address,
          admin: false,
        })
        .catch((e) => {
          console.log(e);
        });
      if (response) {
        notify(data, "register");
      }
    }
  };

  return (
    <div className="containerLogin">
      <div
        className="container"
        style={{ width: "100vw", justifyContent: "center" }}
      >
        <input id="signup_toggle" type="checkbox" />
        <div className="form">
          <div className="form_front">
            <div className="form_details">Login</div>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "80%",
              }}
              onSubmit={formikLogin.handleSubmit}
            >
              <div style={{ width: "100%" }}>
                <input
                  type="text"
                  className="input"
                  placeholder="Email"
                  name="email"
                  value={formikLogin.values.email}
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
                {formikLogin.errors.email ? (
                  <FormHelperText className="helper-text" error>
                    {formikLogin.errors.email}
                  </FormHelperText>
                ) : !existantEmail ? (
                  <FormHelperText className="helper-text" error>
                    This account could not be found!
                  </FormHelperText>
                ) : null}
              </div>
              <div style={{ width: "100%" }}>
                <input
                  type="password"
                  className="input"
                  placeholder="Password"
                  name="password"
                  value={formikLogin.values.password}
                  onChange={formikLogin.handleChange}
                  onBlur={formikLogin.handleBlur}
                />
                {formikLogin.errors.password ? (
                  <FormHelperText className="helper-text" error>
                    {formikLogin.errors.password}
                  </FormHelperText>
                ) : null}
              </div>
              <button
                className="btn"
                type="submit"
                style={{ width: "70%", marginTop: "30px" }}
              >
                Login
              </button>
            </form>
            <span className="switch">
              Don't have an account?
              <label htmlFor="signup_toggle" className="signup_tog">
                Sign Up
              </label>
            </span>
          </div>

          <form className="form" onSubmit={formikRegister.handleSubmit}>
            <div className="form_back">
              <div className="form_details">SignUp</div>
              <div className="form_row">
                <div className="form_column">
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Email"
                      name="email"
                      value={formikRegister.values.email}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.email ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.email}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="password"
                      className="input"
                      placeholder="Password"
                      name="password"
                      value={formikRegister.values.password}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.password ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.password}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="password"
                      className="input"
                      placeholder="Confirm Password"
                      name="confirmPassword"
                      value={formikRegister.values.confirmPassword}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.confirmPassword ? (
                      <FormHelperText className="helper-text" error>
                        Passwords doesn't match!
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="First Name"
                      name="firstName"
                      value={formikRegister.values.firstName}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.firstName ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.firstName}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Last Name"
                      name="lastName"
                      value={formikRegister.values.lastName}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.lastName ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.lastName}
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
                <div className="form_column">
                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Date of birth"
                      name="dateOfBirth"
                      value={formikRegister.values.dateOfBirth}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.dateOfBirth ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.dateOfBirth}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Phone"
                      name="phone"
                      value={formikRegister.values.phone}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.phone ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.phone}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Country"
                      name="country"
                      value={formikRegister.values.country}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.country ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.country}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="City"
                      name="city"
                      value={formikRegister.values.city}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.city ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.city}
                      </FormHelperText>
                    ) : null}
                  </div>

                  <div style={{ width: "100%" }}>
                    <input
                      type="text"
                      className="input"
                      placeholder="Address"
                      name="address"
                      value={formikRegister.values.address}
                      onChange={formikRegister.handleChange}
                      onBlur={formikRegister.handleBlur}
                    />
                    {formikRegister.errors.address ? (
                      <FormHelperText className="helper-text" error>
                        {formikRegister.errors.address}
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
              </div>
              <button type="submit" className="btn">
                Signup
              </button>
              <span className="switch">
                Already have an account?
                <label htmlFor="signup_toggle" className="signup_tog">
                  Sign In
                </label>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    logIn: (
      email,
      firstName,
      lastName,
      dateOfBirth,
      phone,
      country,
      city,
      address,
      admin
    ) =>
      dispatch(
        logIn(
          email,
          firstName,
          lastName,
          dateOfBirth,
          phone,
          country,
          city,
          address,
          admin
        )
      ),
  };
};

export default connect(null, mapDispatchToProps)(Login);
