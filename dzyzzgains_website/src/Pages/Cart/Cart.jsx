import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  removeAllFromCart,
  removeFromCart,
  adjustQty,
} from "../../redux/Shop/shop_action";
import styled from "styled-components";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import LogoIMG from "../../images/Logo.png";
import { Button, Grid } from "@mui/material";
import { grey } from "@mui/material/colors";
import "./cart.styles.css";
import CardCart from "../../components/CardCart/CardCart";

const KEY = process.env.REACT_APP_STRIPE;

const Cart = ({
  productsAddedToCart,
  removeFromCart,
  removeAllFromCart,
  adjustQty,
}) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();

  const increaseQty = (productId) => {
    productsAddedToCart.forEach((product) => {
      if (productId === product.id) {
        adjustQty(product, product.qty + 1);
      }
    });
  };
  const decreaseQty = (productId) => {
    productsAddedToCart.forEach((product) => {
      if (productId === product.id) {
        if (product.qty === 1) {
          adjustQty(product, product.qty);
        } else {
          adjustQty(product, product.qty - 1);
        }
      }
    });
  };

  useEffect(() => {
    let items = 0;
    let price = 0;
    productsAddedToCart.find((item) => {
      items += item.qty;
      price += item.qty * item.price;
    });
    price = Math.round((price + Number.EPSILON) * 100) / 100;
    setTotalPrice(price);
    setTotalItems(items);
  }, [
    productsAddedToCart,
    totalPrice,
    totalItems,
    setTotalItems,
    setTotalPrice,
  ]);
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/products`;
    navigate(path);
  };

  return (
    <Grid container spacing={3} style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Grid container spacing={6} style={{ padding: "20px" }}>
          <Grid item xs={12} sm={12} md={6} lg={4}>
            <Grid container spacing={3} className="title-button-container">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h1 className="text-header">YOUR BAG</h1>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={6}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="outlined"
                  onClick={routeChange}
                  className="buttons-header"
                >
                  CONTINUE SHOPPING
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={8}>
            <Grid container spacing={3} className="container-summary">
              <Grid item xs={12} sm={6} md={3} lg={3}>
                <Button
                  variant="outlined"
                  onClick={() => removeAllFromCart()}
                  className="empty-cart-button"
                >
                  EMPTY CART
                </Button>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={9}
                lg={7}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <h2 style={{ fontWeight: 400 }}>
                  ORDER SUMMARY ({totalItems} items)
                </h2>
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                lg={2}
                className="container-text-total"
              >
                <span className="text-total">Total {totalPrice}$</span>
              </Grid>
              <Grid item xs={12} sm={6} md={9} lg={12}>
                <StripeCheckout
                  name="DZyzzGains Shop"
                  image={LogoIMG}
                  billingAddress
                  shippingAddress
                  description={`Your total is $${totalPrice}`}
                  amount={totalPrice * 100}
                  // token={onToken}
                  stripeKey={KEY}
                >
                  <Button
                    size="large"
                    style={{
                      backgroundColor: grey[900],
                      color: grey[50],
                      width: "100%",
                    }}
                  >
                    CHECKOUT NOW
                  </Button>
                </StripeCheckout>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Grid container spacing={3}>
              {productsAddedToCart &&
                productsAddedToCart.map((product) => (
                  <Grid key={product.id} item xs={12} sm={12} md={6} lg={4}>
                    <CardCart
                      item={product}
                      increaseQty={increaseQty}
                      decreaseQty={decreaseQty}
                      removeFromCart={removeFromCart}
                    ></CardCart>
                  </Grid>
                ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    adjustQty: (id, value) => dispatch(adjustQty(id, value)),
    removeAllFromCart: () => dispatch(removeAllFromCart()),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
