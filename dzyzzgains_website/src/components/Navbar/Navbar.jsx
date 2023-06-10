import HomeIcon from "@mui/icons-material/Home";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import Logout from "@mui/icons-material/Logout";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import StarIcon from "@mui/icons-material/Star";
import { Link } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  Avatar,
  Button,
  Divider,
  Grid,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { teal } from "@mui/material/colors";
import { logOut } from "../../redux/User/user_actions";
import "./navbar.styles.css";

function Navbar({
  productsAddedToCart,
  productsAddedToFavourite,
  productsAddedToWishList,
  isLoggedIn,
  logOut,
  firstName,
  lastName,
  email,
  admin,
}) {
  const [totalItemsCart, setTotalItemsCart] = useState(0);
  const [totalItemsFavourites, setTotalItemsFavouritest] = useState(0);
  const [totalItemsWishList, setTotalItemsWishList] = useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    let items = 0;
    productsAddedToCart.find((item) => {
      items += item.qty;
    });
    setTotalItemsCart(items);
    setTotalItemsFavouritest(productsAddedToFavourite?.length);
    setTotalItemsWishList(productsAddedToWishList?.length);
  }, [
    productsAddedToCart,
    productsAddedToFavourite,
    productsAddedToWishList,
    totalItemsCart,
    totalItemsFavourites,
    totalItemsWishList,
  ]);
  return (
    <Grid container spacing={3} className="container-navbar">
      <Grid
        item
        lg={4}
        md={5}
        sm={5}
        xs={12}
        className="left-container grid-item"
      >
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
      <Grid item lg={4} md={2} sm={3} xs={12} className="grid-item">
        <h1 className="title-text">DZyzzGains</h1>
      </Grid>
      <Grid
        item
        lg={4}
        md={5}
        sm={4}
        xs={12}
        className="right-container grid-item"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
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
            <div>
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2 }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                >
                  <Avatar sx={{ width: 32, height: 32, background: teal[300] }}>
                    {firstName[0]}
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                classes={{ paper: "menu-paper" }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem onClick={handleClose}>
                  <Avatar /> Profile
                </MenuItem>
                <Divider />
                <Link
                  to={"/"}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <MenuItem onClick={() => logOut(email)}>
                    <ListItemIcon>
                      <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Link>
              </Menu>
              {/* <Link to={"/"} style={{ textDecoration: "none" }}>
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
            </Link> */}
            </div>
          )}
        </div>
        {!admin ? (
          <div>
            <Badge badgeContent={totalItemsFavourites} color="primary">
              <div className="cart-icon">
                <Link to={`/favorite`}>
                  <StarIcon />
                </Link>
              </div>
            </Badge>
            {isLoggedIn ? (
              <Badge badgeContent={totalItemsWishList} color="primary">
                <div className="cart-icon">
                  <Link to={`/wishlist`}>
                    <FavoriteIcon />
                  </Link>
                </div>
              </Badge>
            ) : null}
            <Badge badgeContent={totalItemsCart} color="primary">
              <div className="cart-icon">
                <Link to={`/cart`}>
                  <ShoppingCartOutlinedIcon />
                </Link>
              </div>
            </Badge>
          </div>
        ) : null}
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
    productsAddedToFavourite: state.shopReducer.productsAddedToFavourite,
    productsAddedToWishList: state.shopReducer.productsAddedToWishList,
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
