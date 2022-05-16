import React, { useState, useEffect } from "react";
import { Typography, Grid } from '@mui/material'; 
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as shoppingActions from "../redux/Shop/shop_action";

const Products = (props) => {
  const { products = [], isLoadingParts = false } = props;
  useEffect(() => {
    props.fetchProducts();
  }, []);
  if (isLoadingParts)
    return (
      <Grid align="center">
        <Typography>Loading parts...</Typography>
      </Grid>
    );
  let filteredProducts =  products;
      console.log(filteredProducts);
      console.log(process.env.REACT_APP_API_URL);

  return (
    <div></div>
  );
};
function mapStateToProps(state) {
  const {
    shopReducer: { products, productsAddedToCart, isLoadingProducts },
  } = state;
  return {
    products: products.map((p) => {
      const isAddedToCart = productsAddedToCart.includes(p.Id);
      return { ...p, isAddedToCart };
    }),

    isLoadingProducts,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}


export default connect(mapStateToProps, mapDispatchToProps)(Products);