import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { newEquipmentSchema } from "../../../validations/newEquipmentSchema.tsx";

toast.configure();

export default function NewEquipment() {
  const typeOfEquipment = [
    {
      value: 1,
      label: "Dumbbells",
    },
    {
      value: 2,
      label: "Kettlebells",
    },
    {
      value: 3,
      label: "Gym Benches",
    },
    {
      value: 4,
      label: "Weight Racks",
    },
    {
      value: 5,
      label: "Pull Up and Push Up Bars",
    },
    {
      value: 6,
      label: "Weight Lifting Belts and Gym Gloves",
    },
    {
      value: 7,
      label: "Weight Plates and Bars",
    },
  ];

  const formikEquipment = useFormik({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      price: "",
      description: "",
      typeOfEquipment: 1,
    },
    validationSchema: newEquipmentSchema,
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
      .post("https://localhost:7177/api/Equipment", {
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        img: product.img,
        typeOfEquipment: parseInt(product.typeOfEquipment),
        category: 2,
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
            <h1>New Equipment Product</h1>
          </Grid>
          <Grid item xs={12}>
            <form
              className="product-form"
              onSubmit={formikEquipment.handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="img"
                    type="text"
                    placeholder="Product image"
                    value={formikEquipment.values.img}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.img &&
                      formikEquipment.touched.img
                    }
                    helperText={formikEquipment.errors.img}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="name"
                    type="text"
                    placeholder="Product name"
                    value={formikEquipment.values.name}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.name &&
                      formikEquipment.touched.name
                    }
                    helperText={formikEquipment.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="brand"
                    type="text"
                    placeholder="Product brand"
                    value={formikEquipment.values.brand}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.brand &&
                      formikEquipment.touched.brand
                    }
                    helperText={formikEquipment.errors.brand}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="price"
                    type="text"
                    placeholder="Product price"
                    value={formikEquipment.values.price}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.price &&
                      formikEquipment.touched.price
                    }
                    helperText={formikEquipment.errors.price}
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
                    value={formikEquipment.values.description}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.description &&
                      formikEquipment.touched.description
                    }
                    helperText={formikEquipment.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="typeOfEquipment"
                    placeholder="Equipment type"
                    select
                    value={formikEquipment.values.typeOfEquipment}
                    onChange={formikEquipment.handleChange}
                    onBlur={formikEquipment.handleBlur}
                    error={
                      !!formikEquipment.errors.typeOfEquipment &&
                      formikEquipment.touched.typeOfEquipment
                    }
                    helperText={formikEquipment.errors.typeOfEquipment}
                  >
                    {typeOfEquipment.map((option) => (
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
