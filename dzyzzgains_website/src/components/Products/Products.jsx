import React, { useState, useEffect } from "react";
import { Typography, Grid, Select } from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import Product from "../Product/Product";
import "./products.styles.css";
import SelectCategory from "../Filters/SelectCategory";
import SelectGender from "../Filters/SelectGender";
import SelectSize from "../Filters/SelectSize";
import SelectEquipmentType from "../Filters/SelectEquipmentType";
import SelectSupplementsType from "../Filters/SelectSupplementsType";

const Products = (props) => {
  const { products = [], isLoadingParts = false } = props;
  const [selected, setSelected] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [supplementType, setSupplementType] = useState("");

  useEffect(() => {
    props.fetchProducts();
  }, []);

  useEffect(() => {
    console.log(filteredProducts);
  }, [selected, size, gender]);

  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading parts...</Typography>
      </Grid>
    );
  let filteredProducts = [];

  switch (selected) {
    case "Supplements":
      filteredProducts = products.filter((p) => p.category === 1);
      break;
    case "Equipment":
      filteredProducts = products.filter((p) => p.category === 2);
      break;
    case "Clothes":
      filteredProducts = products.filter((p) => p.category === 3);
    case "Remove filter":
      filteredProducts = products;
      break;
    default:
      filteredProducts = products;
  }

  switch (gender) {
    case "Men":
      filteredProducts = filteredProducts.filter((p) => p.gender === 1);
      break;
    case "Woman":
      filteredProducts = filteredProducts.filter((p) => p.gender === 2);
      break;
    case "Kids":
      filteredProducts = filteredProducts.filter((p) => p.gender === 3);
      break;
    case undefined:
      filteredProducts = filteredProducts;
      break;
    default:
      filteredProducts = filteredProducts;
  }

  switch (size) {
    case "XS":
      filteredProducts = filteredProducts.filter((p) => p.size === 1);
      break;
    case "S":
      filteredProducts = filteredProducts.filter((p) => p.size === 2);
      break;
    case "M":
      filteredProducts = filteredProducts.filter((p) => p.size === 3);
      break;
    case "L":
      filteredProducts = filteredProducts.filter((p) => p.size === 4);
      break;
    case "XL":
      filteredProducts = filteredProducts.filter((p) => p.size === 5);
      break;
    case "XXL":
      filteredProducts = filteredProducts.filter((p) => p.size === 6);
      break;
    case undefined:
      filteredProducts = filteredProducts;
      break;
    default:
      filteredProducts = filteredProducts;
  }

  switch (equipmentType) {
    case "Dumbbells":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 1
      );
      break;
    case "Gym Benches":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 2
      );
      break;
    case "Kettlebells":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 3
      );
      break;
    case "Pull Up and Push Up Bars":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 4
      );
      break;
    case "Weight Lifting Belts and Gym Gloves":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 5
      );
      break;
    case "Weight Plates and Bars":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfEquipment === 6
      );
      break;
    case undefined:
      filteredProducts = filteredProducts;
      break;
    default:
      filteredProducts = filteredProducts;
  }

  switch (supplementType) {
    case "Creatine":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfSupplement === 1
      );
      break;
    case "Food and snacks":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfSupplement === 2
      );
      break;
    case "Proteines":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfSupplement === 3
      );
      break;
    case "Vitamins":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfSupplement === 4
      );
      break;
    case "Weight Gainers":
      filteredProducts = filteredProducts.filter(
        (p) => p.typeOfSupplement === 5
      );
      break;
    case undefined:
      filteredProducts = filteredProducts;
      break;
    default:
      filteredProducts = filteredProducts;
  }

  return (
    <Grid container spacing={3} className="container-products">
      <Grid item lg={12} md={9} sm={8} xs={6}>
        <div>
          <SelectCategory setSelectedCategory={setSelected} />
          {selected === "Clothes" ? (
            <div style={{ display: "flex" }}>
              <SelectGender setSelectedGender={setGender} />
              <SelectSize setSelectedSize={setSize} />
            </div>
          ) : selected === "Equipment" ? (
            <SelectEquipmentType setSelectedEquipmentType={setEquipmentType} />
          ) : selected === "Supplements" ? (
            <SelectSupplementsType
              setSelectedSupplementsType={setSupplementType}
            />
          ) : null}
        </div>
      </Grid>
      {filteredProducts &&
        filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
            {/* <Product item={product} addToCart={props.addToCart} /> */}
            <Product
              item={product}
              addToCart={props.addToCart}
              addToFavourite={props.addToFavourite}
              isAddedToFavourite={props.isAddedToFavourite}
            />
          </Grid>
        ))}
    </Grid>
  );
};
function mapStateToProps(state) {
  const {
    shopReducer: { products, productsAddedToCart, isLoadingProducts },
  } = state;
  return {
    products: products.map((p) => {
      const isAddedToCart = productsAddedToCart.includes(p.id);
      return { ...p, isAddedToCart };
    }),
    isLoadingProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
