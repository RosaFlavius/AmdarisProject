import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { newClothesSchema } from "../../../validations/newClothesSchema.tsx";

toast.configure();

export default function NewClothes() {
  const gender = [
    {
      value: 1,
      label: "Man",
    },
    {
      value: 2,
      label: "Woman",
    },
    {
      value: 3,
      label: "Kids",
    },
  ];
  const size = [
    {
      value: 1,
      label: "XS",
    },
    {
      value: 2,
      label: "S",
    },
    {
      value: 3,
      label: "M",
    },
    {
      value: 4,
      label: "L",
    },
    {
      value: 5,
      label: "XL",
    },
    {
      value: 6,
      label: "XXL",
    },
  ];

  const formikClothes = useFormik({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      price: "",
      description: "",
      gender: 1,
      size: 1,
    },
    validationSchema: newClothesSchema,
    onSubmit: (values) => {
      onSubmit(values);
    },
  });

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success(
        `Product ${response.data.name} was created with ID: ${response.data.id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        }
      );
    }
  };

  const onSubmit = async (product) => {
    const response = await axios
      .post("https://localhost:7177/api/Clothes", {
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        img: product.img,
        size: parseInt(product.size),
        gender: parseInt(product.gender),
        category: 1,
      })
      .catch((e) => console.log(e));
    if (response) {
      notify(true);
    } else {
      notify(false);
    }
  };

  return (
    <Grid container spacing={3} className="products-layout">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <Grid container className="container-product">
          <Grid item xs={12}>
            <h1>New Clothes Product</h1>
          </Grid>
          <Grid item xs={12}>
            <form
              className="product-form"
              onSubmit={formikClothes.handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="img"
                    type="text"
                    placeholder="Product image"
                    value={formikClothes.values.img}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.img && formikClothes.touched.img
                    }
                    helperText={formikClothes.errors.img}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="name"
                    type="text"
                    placeholder="Product name"
                    value={formikClothes.values.name}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.name && formikClothes.touched.name
                    }
                    helperText={formikClothes.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="brand"
                    type="text"
                    placeholder="Product brand"
                    value={formikClothes.values.brand}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.brand &&
                      formikClothes.touched.brand
                    }
                    helperText={formikClothes.errors.brand}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="price"
                    type="text"
                    placeholder="Product price"
                    value={formikClothes.values.price}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.price &&
                      formikClothes.touched.price
                    }
                    helperText={formikClothes.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="description"
                    type="text"
                    multiline
                    placeholder="Product description"
                    value={formikClothes.values.description}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.description &&
                      formikClothes.touched.description
                    }
                    helperText={formikClothes.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="gender"
                    placeholder="Product description"
                    select
                    value={formikClothes.values.gender}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.gender &&
                      formikClothes.touched.gender
                    }
                    helperText={formikClothes.errors.gender}
                  >
                    {gender.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    InputLabelProps={{ className: "label-text-field" }}
                    name="size"
                    select
                    placeholder="Product size"
                    value={formikClothes.values.size}
                    onChange={formikClothes.handleChange}
                    onBlur={formikClothes.handleBlur}
                    error={
                      !!formikClothes.errors.size && formikClothes.touched.size
                    }
                    helperText={formikClothes.errors.size}
                  >
                    {size.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
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
