import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import Product from "../Product/Product";
import FilterDropdown from "../FilterDropdown/FilterDropdown";
import "./products.styles.css";

const Products = (props) => {
  const { products = [], isLoadingParts = false } = props;
  const [selected, setSelected] = useState("");
  useEffect(() => {
    props.fetchProducts();
  }, []);
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
      break;
    case "Remove filter":
      filteredProducts = products;
      break;
    default:
      filteredProducts = products;
  }

  return (
    <Grid container spacing={3} className="container-products">
      <Grid item lg={12} md={9} sm={8} xs={6}>
        {/* <Grid item lg={2} md={3} sm={4} xs={6}>
          <div className="dashboard_menu">
            <FilterDropdown selected={selected} setSelected={setSelected} />
          </div>
        </Grid> */}
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
