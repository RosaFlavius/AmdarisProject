import React, { useState, useEffect } from "react";
import { Typography, Grid, Select, TextField } from "@mui/material";
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
import SelectPrice from "../Filters/SelectPrice";

const Products = (props) => {
  const { products = [], isLoadingParts = false } = props;
  const [selected, setSelected] = useState("");
  const [size, setSize] = useState("");
  const [gender, setGender] = useState("");
  const [equipmentType, setEquipmentType] = useState("");
  const [supplementType, setSupplementType] = useState("");
  const [price, setPrice] = useState("");
  const [search, setSearch] = useState("");

  let aux = [];
  let sw = 0;

  useEffect(() => {
    props.fetchProducts();
  }, []);

  useEffect(() => {
    aux = JSON.parse(JSON.stringify(filteredProducts));
  }, [selected, size, gender, equipmentType, supplementType, search]);

  console.log(search);

  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading parts...</Typography>
      </Grid>
    );
  let filteredProducts = products;

  switch (selected) {
    case "Supplements":
      filteredProducts = products.filter((p) => p.category === 1);
      break;
    case "Equipment":
      filteredProducts = products.filter((p) => p.category === 2);
      break;
    case "Clothes":
      filteredProducts = products.filter((p) => p.category === 3);
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
    default:
      filteredProducts = filteredProducts;
  }

  switch (price) {
    case "Ascending":
      filteredProducts.sort((x, y) => x.price - y.price);
      sw = 1;
      break;
    case "Descending":
      filteredProducts.sort((x, y) => y.price - x.price);
      sw = 1;
      break;
    default:
      if (sw === 1) {
        filteredProducts = aux;
        sw = 0;
      } else {
        filteredProducts = filteredProducts;
      }
  }

  filteredProducts = filteredProducts.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Grid container spacing={3} className="container-products">
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item lg={2} md={9} sm={8} xs={6}>
            <SelectCategory setSelectedCategory={setSelected} />
          </Grid>
          {selected === "Clothes" ? (
            <>
              <Grid item lg={2} md={9} sm={8} xs={6}>
                <SelectGender setSelectedGender={setGender} />
              </Grid>
              <Grid item lg={2} md={9} sm={8} xs={6}>
                <SelectSize setSelectedSize={setSize} />
              </Grid>
            </>
          ) : selected === "Equipment" ? (
            <Grid item lg={2} md={9} sm={8} xs={6}>
              <SelectEquipmentType
                setSelectedEquipmentType={setEquipmentType}
              />
            </Grid>
          ) : selected === "Supplements" ? (
            <Grid item lg={2} md={9} sm={8} xs={6}>
              <SelectSupplementsType
                setSelectedSupplementsType={setSupplementType}
              />
            </Grid>
          ) : null}
          <Grid item lg={2} md={9} sm={8} xs={6}>
            <SelectPrice setSelectedPrice={setPrice} />
          </Grid>
          <Grid item lg={2} md={9} sm={8} xs={6}>
            <TextField
              id="outlined-basic"
              label="Search by name"
              variant="outlined"
              value={search}
              className="select-filter-style"
              onChange={(event) => setSearch(event.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>
      {filteredProducts &&
        filteredProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={6} lg={4}>
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
