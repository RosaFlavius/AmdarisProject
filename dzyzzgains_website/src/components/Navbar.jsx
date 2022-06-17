import styled from "styled-components";
import Badge from "@mui/material/Badge";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Button } from "@mui/material";
import { teal } from "@mui/material/colors";
import { logOut } from "../redux/User/user_actions";

const Container = styled.div`
  height: 80px;
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex: 1;
`;

const EmailDiv = styled.div`
  color: #4db6ac;
  font-size: 20px;
  margin-bottom: 8px;
`;
const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
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
    <div>
      <Container>
        <Wrapper>
          <Left>
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
          </Left>
          <Center>
            <Logo>DZyzzGains</Logo>
          </Center>
          <Right>
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
          </Right>
        </Wrapper>
      </Container>
    </div>
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
