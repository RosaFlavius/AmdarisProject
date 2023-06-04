import "./product-admin.styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../redux/Shop/shop_action";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useFormik } from "formik";
import { Button, Grid, TextField } from "@mui/material";
import { editProductSchema } from "../../../validations/editProductSchema.tsx";

toast.configure();

export default function ProductAdmin() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [product, setProduct] = useState({});

  const getProduct = async () => {
    const res = await publicRequest.get("/product/" + id);
    setProduct(res.data);
  };

  const onSubmitUpdate = async (prod) => {
    const response = await axios
      .put("https://localhost:7177/api/Product/" + `${id}`, {
        id: id,
        name: prod.name,
        brand: prod.brand,
        description: prod.description,
        price: prod.price,
        img: prod.img,
      })
      .catch((e) => console.log(e));
    setProduct(response.data);
    notify(response);
  };

  const formikEditProduct = useFormik({
    initialValues: {
      img: "",
      name: "",
      brand: "",
      price: "",
      description: "",
    },
    validationSchema: editProductSchema,
    onSubmit: (values) => {
      onSubmitUpdate(values);
    },
  });

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success(`Product ${response.data.name} was updated successfully!`, {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    getProduct();
  }, [id, product]);
  return (
    <Grid container spacing={6} className="products-layout">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <h1 className="productTitle">Product</h1>
          </Grid>
          <Grid item xs={11} className="container-info-prod">
            <Grid container spacing={1}>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <img
                  src={product.img}
                  alt=""
                  style={{
                    width: "70px",
                    heigth: "70px",
                    objectFit: "contain",
                  }}
                />
                <div className="product-info"> {product.name}</div>
              </Grid>
              <Grid item xs={12}>
                <span className="product-info">Id: </span>
                <span className="product-info-value">{product.id}</span>
              </Grid>
              <Grid item xs={12}>
                <span className="product-info">Brand: </span>
                <span className="product-info-value">{product.brand}</span>
              </Grid>
              <Grid item xs={12}>
                <span className="product-info">Description: </span>
                <span className="product-info-value">
                  {product.description}
                </span>
              </Grid>
              <Grid item xs={12}>
                <span className="product-info">Price: </span>
                <span className="product-info-value">{product.price}$</span>
              </Grid>
              <Grid item xs={12}>
                <span className="product-info">ImageLink: </span>
                <span className="product-info-value">{product.img}</span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <form
              className="product-form"
              onSubmit={formikEditProduct.handleSubmit}
            >
              <Grid container spacing={3}>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="img"
                    type="text"
                    label="Product image"
                    value={formikEditProduct.values.img}
                    onChange={formikEditProduct.handleChange}
                    onBlur={formikEditProduct.handleBlur}
                    error={
                      !!formikEditProduct.errors.img &&
                      formikEditProduct.touched.img
                    }
                    helperText={formikEditProduct.errors.img}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="name"
                    type="text"
                    label="Product name"
                    value={formikEditProduct.values.name}
                    onChange={formikEditProduct.handleChange}
                    onBlur={formikEditProduct.handleBlur}
                    error={
                      !!formikEditProduct.errors.name &&
                      formikEditProduct.touched.name
                    }
                    helperText={formikEditProduct.errors.name}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="brand"
                    type="text"
                    label="Product brand"
                    value={formikEditProduct.values.brand}
                    onChange={formikEditProduct.handleChange}
                    onBlur={formikEditProduct.handleBlur}
                    error={
                      !!formikEditProduct.errors.brand &&
                      formikEditProduct.touched.brand
                    }
                    helperText={formikEditProduct.errors.brand}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <TextField
                    className="text-field-form"
                    InputProps={{ className: "input-text-field" }}
                    name="price"
                    type="text"
                    label="Product price"
                    value={formikEditProduct.values.price}
                    onChange={formikEditProduct.handleChange}
                    onBlur={formikEditProduct.handleBlur}
                    error={
                      !!formikEditProduct.errors.price &&
                      formikEditProduct.touched.price
                    }
                    helperText={formikEditProduct.errors.price}
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
                    value={formikEditProduct.values.description}
                    onChange={formikEditProduct.handleChange}
                    onBlur={formikEditProduct.handleBlur}
                    error={
                      !!formikEditProduct.errors.description &&
                      formikEditProduct.touched.description
                    }
                    helperText={formikEditProduct.errors.description}
                  />
                </Grid>
                <Grid item xs={12} sm={11} md={10} lg={8}>
                  <Button
                    variant="contained"
                    type="submit"
                    className="form-button"
                  >
                    Update Product
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
