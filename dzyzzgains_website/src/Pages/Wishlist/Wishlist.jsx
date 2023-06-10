import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import "./wishlist.style.css";
import WishlistCard from "../../components/WishlistCard/WishlistCard";

const Wishlist = ({ productsAddedToWishlist }) => {
  return (
    <Grid
      container
      spacing={6}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "50px",
      }}
    >
      {productsAddedToWishlist &&
        productsAddedToWishlist.map((product) => (
          <Grid key={product.id} item xs={8}>
            <WishlistCard item={product} />
          </Grid>
        ))}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    productsAddedToWishlist: state.shopReducer.productsAddedToWishList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // removeFromFavourite: (id) => dispatch(removeFromFavourite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wishlist);
