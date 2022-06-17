import React from "react";
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
import "./stylesLogin.css";
import Joi from "joi";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logIn } from "../../redux/User/user_actions";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";

const schema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string().min(5).max(64).required(),
});

const Login = ({ logIn }) => {
  const [existantEmail, setExistantEmail] = useState(true);
  const [checkedPassword, setCheckedPassword] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: joiResolver(schema),
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

  const checkPassword = async (email, pass) => {
    let response;
    try {
      response = await axios.get(
        "https://localhost:7177/api/User/users/" + `${email}`
      );
      if (response.data) {
        if (pass === response.data.password) {
          return true;
        }
      }
    } catch (e) {
      return false;
    }
    return false;
  };

  const notify = (response) => {
    if (response) {
      toast.success("Login successful!", {
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

  const onSubmit = async (data) => {
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
    console.log("Existant email " + existantEmail);
    console.log("Checked pass " + checkedPassword);
    const response = await axios
      .get("https://localhost:7177/api/User/users/" + `${data.email}`)
      .catch((e) => {
        console.log("Error");
      });
    console.log(response);
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
    notify(data);
    setTimeout(() => {
      if (response.data.admin) {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }, 2000);
    console.log(data);
  };

  return (
    <div>
      <Navbar />
      <div className="containerLogin" style={{ marginTop: "100px" }}>
        <div className="content">
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
                      {"Email"}
                    </InputLabel>
                    <Input
                      className="inputForm"
                      {...field}
                      error={!!errors.email || !existantEmail}
                    />
                    {errors.email ? (
                      <FormHelperText error>Ex. name@domain.com</FormHelperText>
                    ) : !existantEmail ? (
                      <FormHelperText error>
                        This account could not be found!
                      </FormHelperText>
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
                      error={!!errors.password || !checkedPassword}
                      type="password"
                    />
                    {errors.password ? (
                      <FormHelperText error>
                        Length between 5 and 64 symbols
                      </FormHelperText>
                    ) : checkedPassword ? (
                      <FormHelperText>
                        Length between 5 and 64 symbols
                      </FormHelperText>
                    ) : (
                      <FormHelperText error>Wrong password!!!</FormHelperText>
                    )}
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
                Login
              </Button>
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
