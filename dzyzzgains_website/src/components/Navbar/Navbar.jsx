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

const EmailDiv = styled.div`
  color: #4db6ac;
  font-size: 20px;
  margin-bottom: 8px;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pinter;
  margin-left: 25px;
`;

const ButtonContainer = styled.div`
  width: 100px;
`;
const Icon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  &:hover {
    background-color: #e9f5f5;
    transform: scale(1.1);
  }
`;

function Navbar({ productsAddedToCart, isLoggedIn, logOut, email, admin }) {
  const [totalItems, setTotalItems] = useState(0);
  useEffect(() => {
    let items = 0;
    productsAddedToCart.find((item) => {
      items += item.qty;
    });
    setTotalItems(items);
  }, [productsAddedToCart, totalItems]);
  return (
    <Grid container spacing={3} className="container-navbar ">
      <Grid item xs={4} className="left-container grid-item">
        <EmailDiv>{email}</EmailDiv>
        <ButtonContainer>
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
        </ButtonContainer>
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
      <Grid item xs={4} className="grid-item">
        <h1 className="title-text">DZyzzGains</h1>
      </Grid>
      <Grid item xs={4} className="right-container grid-item">
        {!isLoggedIn ? (
          <>
            <MenuItem>
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
            </MenuItem>
            <MenuItem>
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
            </MenuItem>
          </>
        ) : (
          <MenuItem>
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
          </MenuItem>
        )}
        <MenuItem>
          <Badge badgeContent={totalItems} color="primary">
            <Icon>
              <Link to={`/cart`}>
                <ShoppingCartOutlinedIcon />
              </Link>
            </Icon>
          </Badge>
        </MenuItem>
      </Grid>
    </Grid>
  );
}

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
    isLoggedIn: state.userReducer.isLoggedIn,
    email: state.userReducer.email,
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
