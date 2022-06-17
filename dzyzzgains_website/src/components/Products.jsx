import React, { useState, useEffect } from "react";
import { Typography, Grid } from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as shoppingActions from "../redux/Shop/shop_action";
import styled from "styled-components";
import Product from "./Product";
import FilterDropdown from "./FilterDropdown";

const Container = styled.div`
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 48,
`;

const DashboardMenu = styled.div`
  display: "flex",
  justifyContent: "start",
  alignSelf: "flex-start",
`;
const ToolBar = styled.div`
  display: flex;
  align-items: center;
  justifycontent: flex-end;
  padding: 0 8px;
  min-height: 64px;
`;

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
      console.log(filteredProducts);
      break;
    case "Equipment":
      filteredProducts = products.filter((p) => p.category === 2);
      console.log(filteredProducts);
      break;
    case "Clothes":
      filteredProducts = products.filter((p) => p.category === 3);
      console.log(filteredProducts);
      break;
    case "Remove filter":
      filteredProducts = products;
      console.log(filteredProducts);
      break;
    default:
      filteredProducts = products;
      console.log(filteredProducts);
  }

  return (
    <main>
      <ToolBar />
      <Grid container>
        <Grid item lg={2} md={3} sm={4} xs={6}>
          <DashboardMenu>
            <FilterDropdown selected={selected} setSelected={setSelected} />
          </DashboardMenu>
        </Grid>
        <Grid item lg={10} md={9} sm={8} xs={6}>
          <Container>
            <Grid
              container
              justifyContent="center"
              spacing={5}
              style={{ height: "100 vh" }}
              item
              lg={10}
              md={8}
              sm={6}
              xs={4}
            >
              {filteredProducts &&
                filteredProducts.map((product) => (
                  <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
                    <Product item={product} addToCart={props.addToCart} />
                  </Grid>
                ))}
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </main>
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
