import React from "react";
import { grey } from "@mui/material/colors";
import { useState } from "react";
import {
  FormControl,
  Input,
  InputLabel,
  FormHelperText,
  Button,
} from "@mui/material";
import Navbar from "../../components/Navbar";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./stylesRegister.css";

toast.configure();

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(5).max(64).required(),
  confirmPassword: Joi.string().min(5).max(64).required(),
  dateOfBirth: Joi.string().min(10).max(10).required(),
  phone: Joi.string().min(10).max(10).required(),
  country: Joi.string().required(),
  city: Joi.string().required(),
  address: Joi.string().required(),
});

const Register = (props) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
      phone: "",
      country: "",
      city: "",
      address: "",
    },
    resolver: joiResolver(schema),
  });
  console.log(errors);
  const [existantEmail, setExistantEmail] = useState(null);
  const [matchPassword, setMatchPassword] = useState(true);

  const notify = (response) => {
    if (response) {
      toast.success("Registration Successful!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  const validatePasswords = (pass, cpass) => {
    if (pass !== cpass) {
      return false;
    }
    return true;
  };

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
      return existantEmail;
    }
  };

  const onSubmit = async (data) => {
    let sw = true;
    console.log(data);
    const emailExistant = await validateExistantEmail(data.email);
    if (emailExistant) {
      setExistantEmail(true);
      sw = false;
      return;
    }
    if (!validatePasswords(data.password, data.confirmPassword)) {
      setMatchPassword(false);
      sw = false;
      return;
    }
    if (sw) {
      setExistantEmail(false);
      const response = await axios.post("https://localhost:7177/api/User", {
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
      });
      if (response) {
        notify(true);
      } else {
        notify(false);
      }
    }
    //then, encrypt pass and send data to the api
  };
  return (
    <div>
      <Navbar />
      <div className="containerRegister" style={{ marginTop: "50px" }}>
        {/* <div className="image">
          <img src={LoginLogo} alt="logo" />
        </div> */}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="input">
            <Controller
              name={"email"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {" "}
                    {"Email"}{" "}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.email || existantEmail}
                  />
                  {errors.email ? (
                    <FormHelperText error>Ex. name@domain.com</FormHelperText>
                  ) : existantEmail ? (
                    <FormHelperText error>Email already exists.</FormHelperText>
                  ) : (
                    <FormHelperText>Ex. name@domain.com</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"password"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Password"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.password}
                    type="password"
                  />
                  <FormHelperText>Length between 5 and 64</FormHelperText>
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"confirmPassword"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Confirm Password"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.confirmPassword || !matchPassword}
                    type="password"
                  />
                  {matchPassword ? null : (
                    <FormHelperText error>Passwords must match.</FormHelperText>
                  )}
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"firstName"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"First Name"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.firstName}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"lastName"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Last Name"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.lastName}
                  />
                </FormControl>
              )}
            />
          </div>

          <div className="input">
            <Controller
              name={"dateOfBirth"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Date of birth"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.dateOfBirth}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"phone"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Phone"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.phone}
                  />
                  <FormHelperText>Length must be 10</FormHelperText>
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"country"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Country"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.country}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"city"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"City"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.city}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="input">
            <Controller
              name={"address"}
              control={control}
              render={({ field }) => (
                <FormControl>
                  <InputLabel
                    className="inputForm"
                    htmlFor="component-simple"
                    required
                  >
                    {"Address"}
                  </InputLabel>
                  <Input
                    className="inputForm"
                    {...field}
                    error={!!errors.address}
                  />
                </FormControl>
              )}
            />
          </div>
          <div className="button">
            <Button
              size="large"
              style={{
                backgroundColor: grey[900],
                color: grey[50],
                width: "100%",
              }}
              onClick={handleSubmit(onSubmit)}
            >
              Register
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Register;
