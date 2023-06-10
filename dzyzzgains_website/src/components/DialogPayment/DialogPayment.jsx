import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { connect } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import { grey } from "@mui/material/colors";
import { bindActionCreators } from "redux";
import LogoIMG from "../../images/Logo.png";
import { removeAllFromCart } from "../../redux/Shop/shop_action";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";

toast.configure();

const DialogPayment = ({
  productsAddedToCart,
  email,
  firstName,
  lastName,
  country,
  city,
  shippingAddress,
  isLoggedIn,
  userId,
  totalPrice,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const notify = () => {
    if (!isLoggedIn) {
      toast.error("You can't place an order without being logged in!", {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    } else if (productsAddedToCart.length <= 0) {
      toast.error(`You need at least one item for an order!`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 2000,
      });
    }
  };

  const notifyOrder = () => {
    toast.success("Your order has been placed!", {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 2000,
    });
  };

  const handleCheckoutButton = () => {
    if (!isLoggedIn || productsAddedToCart.length <= 0) {
      notify();
      setOpen(false);
    } else {
      setOpen(true);
    }
  };

  const handleOrder = async () => {
    let orderId;
    await axios
      .post(`https://localhost:7177/api/Order`, {
        totalPrice: totalPrice,
      })
      .then((response) => {
        productsAddedToCart.forEach((element) => {
          axios.patch(`https://localhost:7177/api/Order`, {
            productId: element.id,
            orderId: response.data.id,
            quantity: element.qty,
          });
        });
        orderId = response.data.id;
      })
      .then(() => {
        axios
          .post(`https://localhost:7177/api/OrderNotification/${email}`, {
            orderId: orderId,
            userId: userId,
          })
          .then(() => {
            axios.post(
              `https://localhost:7177/api/OrderNotification/send/${orderId}`
            );
          });
      });

    dispatch(removeAllFromCart());
    notifyOrder();
    setOpen(false);
  };

  return (
    <div>
      <Button
        size="large"
        style={{
          backgroundColor: grey[900],
          color: grey[50],
          width: "100%",
        }}
        onClick={handleCheckoutButton}
      >
        CHECKOUT NOW
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            id="alert-dialog-description"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>
              <p style={{ fontSize: "25px" }}>
                <b>Your order details:</b>
              </p>
              <p>
                <b>Billed To:</b>
                {firstName} {lastName}
              </p>
              <p>
                <b>Email: </b>
                {email}
              </p>
              <p>
                <b>Shipping Address:</b>
                {shippingAddress} {city} {country}
              </p>
              <p>
                <b>Total: </b>
                {totalPrice}$
              </p>

              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  <b>Payment method:</b>
                </FormLabel>
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  <FormControlLabel
                    value="cash"
                    control={<Radio />}
                    label="Cash"
                    checked
                  />
                  <FormControlLabel
                    disabled
                    value="card"
                    control={<Radio />}
                    label="Via Credit Card"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <img
              src={LogoIMG}
              style={{ heigth: "300px", width: "300px", objectFit: "contain" }}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{
              backgroundColor: grey[900],
              color: grey[50],
              width: "100%",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={() => handleOrder()}
            autoFocus
            style={{
              backgroundColor: grey[900],
              color: grey[50],
              width: "100%",
            }}
          >
            Pay
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
    userId: state.userReducer.userId,
    email: state.userReducer.email,
    firstName: state.userReducer.firstName,
    lastName: state.userReducer.lastName,
    city: state.userReducer.city,
    country: state.userReducer.country,
    shippingAddress: state.userReducer.address,
    isLoggedIn: state.userReducer.isLoggedIn,
  };
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(DialogPayment);
