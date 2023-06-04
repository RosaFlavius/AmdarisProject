import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Grid } from "@mui/material";
import { teal } from "@mui/material/colors";
import { logOut } from "../../redux/User/user_actions";
import "./navbar.styles.css";

function Navbar({
  productsAddedToCart,
  productsAddedToFavourite,
  isLoggedIn,
  logOut,
  firstName,
  lastName,
  email,
  admin,
}) {
  const [totalItemsCart, setTotalItemsCart] = useState(0);
  const [totalItemsFavourites, setTotalItemsFavouritest] = useState(0);
  useEffect(() => {
    let items = 0;
    productsAddedToCart.find((item) => {
      items += item.qty;
    });
    setTotalItemsCart(items);
    setTotalItemsFavouritest(productsAddedToFavourite?.length);
  }, [
    productsAddedToCart,
    productsAddedToFavourite,
    totalItemsCart,
    totalItemsFavourites,
  ]);
  return (
    <Grid container spacing={3} className="container-navbar">
      <Grid item sm={4} xs={12} className="left-container grid-item">
        {admin ? (
          <Link to={"/admin"} style={{ textDecoration: "none" }}>
            <Button
              size="large"
              variant="contained"
              style={{
                background: teal[300],
                width: "100%",
              }}
            >
              <AdminPanelSettingsIcon /> ADMIN
            </Button>
          </Link>
        ) : null}
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            size="large"
            variant="contained"
            style={{
              background: teal[300],
              width: "100%",
            }}
          >
            <HomeIcon /> HOME
          </Button>
        </Link>

        <Link to={"/products"} style={{ textDecoration: "none" }}>
          <Button
            size="large"
            variant="contained"
            style={{
              background: teal[300],
              width: "100%",
            }}
          >
            <FitnessCenterIcon />
            PRODUCTS
          </Button>
        </Link>
      </Grid>
      <Grid item sm={4} xs={12} className="grid-item">
        <h1 className="title-text">DZyzzGains</h1>
      </Grid>
      <Grid item sm={4} xs={12} className="right-container grid-item">
        <span className="user_text">
          {firstName} {lastName[0]}
        </span>
        {!isLoggedIn ? (
          <Link to={"/login"} style={{ textDecoration: "none" }}>
            <Button
              size="large"
              variant="contained"
              style={{
                background: teal[300],
                width: "100%",
              }}
            >
              <LoginIcon /> LOG IN
            </Button>
          </Link>
        ) : (
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <Button
              onClick={() => logOut(email)}
              size="large"
              variant="contained"
              style={{
                background: teal[300],
                width: "100%",
              }}
            >
              <LogoutIcon /> LOG OUT
            </Button>
          </Link>
        )}
        <div>
          <Badge badgeContent={totalItemsFavourites} color="primary">
            <div className="cart-icon">
              <Link to={`/favorite`}>
                <FavoriteIcon />
              </Link>
            </div>
          </Badge>
          <Badge badgeContent={totalItemsCart} color="primary">
            <div className="cart-icon">
              <Link to={`/cart`}>
                <ShoppingCartOutlinedIcon />
              </Link>
            </div>
          </Badge>
        </div>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
    productsAddedToFavourite: state.shopReducer.productsAddedToFavourite,
    isLoggedIn: state.userReducer.isLoggedIn,
    email: state.userReducer.email,
    firstName: state.userReducer.firstName,
    lastName: state.userReducer.lastName,
    admin: state.userReducer.admin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (email) => {
      dispatch(logOut(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
