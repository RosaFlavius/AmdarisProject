import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button, Grid } from "@mui/material";
import { teal } from "@mui/material/colors";
import { logOut } from "../../redux/User/user_actions";
import "./navbar.styles.css";

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pinter;
  margin-left: 25px;
`;

const ButtonContainer = styled.div`
  width: 100px;
`;

function Navbar({
  productsAddedToCart,
  isLoggedIn,
  logOut,
  firstName,
  lastName,
  email,
  admin,
}) {
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let items = 0;
    productsAddedToCart.find((item) => {
      items += item.qty;
    });
    setTotalItems(items);
  }, [productsAddedToCart, totalItems]);
  return (
    <Grid container spacing={3} className="container-navbar">
      <Grid item sm={4} xs={12} className="left-container grid-item">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <Button
            size="large"
            style={{
              color: teal[300],
              width: "100%",
            }}
          >
            HOME
          </Button>
        </Link>
        <ButtonContainer>
          <Link to={"/products"} style={{ textDecoration: "none" }}>
            <Button
              size="large"
              style={{
                color: teal[300],
                width: "100%",
              }}
            >
              PRODUCTS
            </Button>
          </Link>
        </ButtonContainer>
      </Grid>
      <Grid item sm={4} xs={12} className="grid-item">
        <h1 className="title-text">DZyzzGains</h1>
      </Grid>
      <Grid item sm={4} xs={12} className="right-container grid-item">
        <span className="user_text">
          {firstName} {lastName[0]}.
        </span>
        {!isLoggedIn ? (
          <>
            <Link to={"/register"} style={{ textDecoration: "none" }}>
              <Button
                size="large"
                style={{
                  color: teal[300],
                  width: "100%",
                }}
              >
                REGISTER
              </Button>
            </Link>

            <Link to={"/login"} style={{ textDecoration: "none" }}>
              <Button
                size="large"
                style={{
                  color: teal[300],
                  width: "100%",
                }}
              >
                LOG IN
              </Button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/"} style={{ textDecoration: "none" }}>
              <Button
                onClick={() => logOut(email)}
                size="large"
                style={{
                  color: teal[300],
                  width: "100%",
                }}
              >
                LOG OUT
              </Button>
            </Link>
          </>
        )}
        <>
          <Badge badgeContent={totalItems} color="primary">
            <div className="cart-icon">
              <Link to={`/cart`}>
                <ShoppingCartOutlinedIcon />
              </Link>
            </div>
          </Badge>
        </>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
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
