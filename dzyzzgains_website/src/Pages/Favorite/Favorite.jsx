import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Grid } from "@mui/material";
import "./favorite.styles.css";
import FavouritesCard from "../../components/FavouritesCard/FavouritesCard";

const Favorite = ({ productsAddedToFavourite, removeFromFavourite }) => {
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    setTotalItems(productsAddedToFavourite.length);
  }, [productsAddedToFavourite, totalItems]);

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
      {productsAddedToFavourite &&
        productsAddedToFavourite.map((product) => (
          <Grid key={product.id} item xs={8}>
            <FavouritesCard item={product} />
          </Grid>
        ))}
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    productsAddedToFavourite: state.shopReducer.productsAddedToFavourite,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // removeFromFavourite: (id) => dispatch(removeFromFavourite(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorite);
