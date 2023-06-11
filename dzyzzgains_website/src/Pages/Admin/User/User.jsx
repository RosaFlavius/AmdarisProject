import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import "./user-admin.styles.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../redux/Shop/shop_action";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newUserSchema } from "../../../validations/newUserSchema.tsx";
import { useFormik } from "formik";

export default function User() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [user, setUser] = useState({});

  const admin = [
    {
      value: false,
      label: "Client account",
    },
    {
      value: true,
      label: "Admin account",
    },
  ];

  const formikUser = useFormik({
    initialValues: {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      phone: "",
      country: "",
      city: "",
      address: "",
      admin: false,
    },
    validationSchema: newUserSchema,
    onSubmit: (values) => {
      onSubmitUpdate(values);
    },
  });

  const getUser = async () => {
    const res = await publicRequest.get("/user/" + id);
    setUser(res.data);
  };

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    } else {
      toast.success(`User ${response.data.name} was updated successfully!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    }
  };

  const onSubmitUpdate = async (usr) => {
    console.log(usr);
    const response = await axios
      .put("https://localhost:7177/api/User/" + `${id}`, {
        id: id,
        firstName: usr.firstName,
        lastName: usr.lastName,
        email: usr.email,
        password: usr.password,
        dateOfBirth: usr.dateOfBirth,
        phone: usr.phone,
        country: usr.country,
        city: usr.city,
        address: usr.address,
        admin: usr.admin,
      })
      .catch((e) => console.log(e));
    notify(response);
  };

  useEffect(() => {
    getUser();
  }, [id, user]);
  return (
    <Grid container spacing={6} className="products-layout">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 className="userTitle">Edit User</h1>
          </Grid>
          <Grid item xs={11} className="container-info-prod">
            <Grid container>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <span className="user-name">
                  {user.firstName} {user.lastName}
                </span>
                <span className="userShowUserTitle">{user.email}</span>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container>
                <Grid item xs={12}>
                  <span className="subheader-text">Account Details</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.lastName} {user.firstName}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.address}</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.dateOfBirth}</span>
                </Grid>
                <Grid item xs={12}>
                  <span className="subheader-text">Contact Details</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.phone}</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </Grid>
                <Grid
                  item
                  xs={12}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.city} | {user.country}
                  </span>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <form className="user-form" onSubmit={formikUser.handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    value={formikUser.values.firstName}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.firstName &&
                      formikUser.touched.firstName
                    }
                    helperText={formikUser.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="lastName"
                    type="text"
                    placeholder="Last name"
                    value={formikUser.values.lastName}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.lastName &&
                      formikUser.touched.lastName
                    }
                    helperText={formikUser.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="email"
                    type="text"
                    placeholder="Email"
                    value={formikUser.values.email}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.email && formikUser.touched.email
                    }
                    helperText={formikUser.errors.email}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formikUser.values.password}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.password &&
                      formikUser.touched.password
                    }
                    helperText={formikUser.errors.password}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="dateOfBirth"
                    type="text"
                    multiline
                    placeholder="Date of birth"
                    value={formikUser.values.dateOfBirth}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.dateOfBirth &&
                      formikUser.touched.dateOfBirth
                    }
                    helperText={formikUser.errors.dateOfBirth}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="phone"
                    type="text"
                    multiline
                    placeholder="Phone"
                    value={formikUser.values.phone}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.phone && formikUser.touched.phone
                    }
                    helperText={formikUser.errors.phone}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="country"
                    type="text"
                    multiline
                    placeholder="Country"
                    value={formikUser.values.country}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.country && formikUser.touched.country
                    }
                    helperText={formikUser.errors.country}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="city"
                    type="text"
                    multiline
                    placeholder="City"
                    value={formikUser.values.city}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={!!formikUser.errors.city && formikUser.touched.city}
                    helperText={formikUser.errors.city}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="address"
                    type="text"
                    multiline
                    placeholder="Address"
                    value={formikUser.values.address}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.address && formikUser.touched.address
                    }
                    helperText={formikUser.errors.address}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    InputLabelProps={{ className: "label-text-field" }}
                    name="admin"
                    select
                    placeholder="Admin"
                    value={formikUser.values.admin}
                    onChange={formikUser.handleChange}
                    onBlur={formikUser.handleBlur}
                    error={
                      !!formikUser.errors.admin && formikUser.touched.admin
                    }
                    helperText={formikUser.errors.admin}
                  >
                    {admin.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={5}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="form-button"
                  >
                    Create
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
