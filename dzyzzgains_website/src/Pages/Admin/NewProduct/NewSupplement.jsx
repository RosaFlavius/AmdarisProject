import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Grid, MenuItem, TextField } from "@mui/material";
import { useFormik } from "formik";
import { newSupplementSchema } from "../../../validations/newSupplementSchema.tsx";

toast.configure();

export default function NewSupplement() {
  const typeOfSupplement = [
    {
      value: 1,
      label: "Creatine",
    },
    {
      value: 2,
      label: "Proteines",
    },
    {
      value: 3,
      label: "Weight Gainers",
    },
    {
      value: 4,
      label: "Vitamins",
    },
    {
      value: 5,
      label: "Food and snacks",
    },
  ];

  const formikSupplement = useFormik({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      price: "",
      description: "",
      typeOfSupplement: 1,
    },
    validationSchema: newSupplementSchema,
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
      .post("https://localhost:7177/api/Supplement", {
        name: product.name,
        brand: product.brand,
        description: product.description,
        price: product.price,
        img: product.img,
        inStock: true,
        typeOfSupplement: parseInt(product.typeOfSupplement),
        category: 3,
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
            <h1>New Supplement Product</h1>
          </Grid>
          <Grid item xs={12}>
            <form
              className="product-form"
              onSubmit={formikSupplement.handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="img"
                    type="text"
                    label="Product image"
                    value={formikSupplement.values.img}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.img &&
                      formikSupplement.touched.img
                    }
                    helperText={formikSupplement.errors.img}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="name"
                    type="text"
                    label="Product name"
                    value={formikSupplement.values.name}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.name &&
                      formikSupplement.touched.name
                    }
                    helperText={formikSupplement.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="brand"
                    type="text"
                    label="Product brand"
                    value={formikSupplement.values.brand}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.brand &&
                      formikSupplement.touched.brand
                    }
                    helperText={formikSupplement.errors.brand}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="price"
                    type="text"
                    label="Product price"
                    value={formikSupplement.values.price}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.price &&
                      formikSupplement.touched.price
                    }
                    helperText={formikSupplement.errors.price}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="description"
                    type="text"
                    multiline
                    label="Product description"
                    value={formikSupplement.values.description}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.description &&
                      formikSupplement.touched.description
                    }
                    helperText={formikSupplement.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="typeOfSupplement"
                    placeholder="Supplement type"
                    select
                    value={formikSupplement.values.typeOfSupplement}
                    onChange={formikSupplement.handleChange}
                    onBlur={formikSupplement.handleBlur}
                    error={
                      !!formikSupplement.errors.typeOfSupplement &&
                      formikSupplement.touched.typeOfSupplement
                    }
                    helperText={formikSupplement.errors.typeOfSupplement}
                  >
                    {typeOfSupplement.map((option) => (
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
