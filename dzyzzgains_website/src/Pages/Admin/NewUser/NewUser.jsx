import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { newUserSchema } from "../../../validations/newUserSchema.tsx";
import { Button, Grid, TextField, MenuItem } from "@mui/material";

toast.configure();

export default function NewUser() {
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
      onSubmit(values);
    },
  });

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: false,
      });
    } else if (response.status === 201) {
      toast.success(
        `User ${response.user.Name} was created with ID: ${response.user.Id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        }
      );
    }
  };

  const onSubmit = async (user) => {
    const response = await axios
      .post("https://localhost:7177/api/User", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        country: user.country,
        city: user.city,
        address: user.address,
        admin: user.admin,
      })
      .catch((e) => console.log(e));
    notify(response);
  };

  return (
    <Grid container spacing={3} className="users-layout">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <Grid container className="container-user">
          <Grid item xs={12}>
            <h1>New User</h1>
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
