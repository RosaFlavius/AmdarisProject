import * as React from "react";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import StarIcon from "@mui/icons-material/Star";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./product.styles.css";
import {
  addToCart,
  addRemoveFavourite,
  addRemoveWishlist,
} from "../../redux/Shop/shop_action";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import axios from "axios";
import { Category } from "../../Enums/Category.ts";
import { EquipmentType } from "../../Enums/EquipmentType.ts";
import { SupplementsType } from "../../Enums/SupplementsType.ts";
import { ClothesSize } from "../../Enums/ClothesSize.ts";
import { ClothesGender } from "../../Enums/ClothesGender.ts";
import { Paper } from "@mui/material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function Product({
  item,
  productsAddedToFavourite,
  productsAddedToWishList,
  userId,
  userEmail,
  isLoggedIn,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isInWishlist, setIsInWishlist] = useState(false);

  const dispatch = useDispatch();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const handleAddToCart = () => {
    dispatch(addToCart({ ...item }));
  };

  const handleAddRemoveFromFavourite = () => {
    dispatch(addRemoveFavourite({ ...item }));
  };

  const handleAddRemoveFromWishlist = async () => {
    console.log(isAddedToWishlist());
    if (!isAddedToWishlist()) {
      await axios
        .post(`https://localhost:7177/api/Notification/${userEmail}`, {
          productId: item.id,
          userId: userId,
        })
        .catch((e) => console.log(e));
    } else {
      await axios
        .delete(`https://localhost:7177/api/Notification/${userId}/${item.id}`)
        .catch((e) => console.log(e));
    }
    dispatch(addRemoveWishlist({ ...item }));
  };

  const isAddedToFavourites = () => {
    return productsAddedToFavourite.find((x) => x.id === item.id);
  };

  const isAddedToWishlist = () => {
    return productsAddedToWishList.find((x) => x.id === item.id);
  };

  const verifyCategory = () => {
    if (item.category === Category.Clothes) {
      return (
        <span>
          <b>Details:</b> {ClothesGender[item.gender]} {ClothesSize[item.size]}
        </span>
      );
    } else if (item.category === Category.Equipment) {
      return (
        <span>
          <b>Details:</b> {EquipmentType[item.typeOfEquipment]}
        </span>
      );
    } else if (item.category === Category.Supplements) {
      return (
        <span>
          <b>Details:</b> {SupplementsType[item.typeOfSupplement]}
        </span>
      );
    }
  };

  return (
    <Card
      className="card"
      sx={{
        height: expanded ? "100%" : "430px",
        width: "100%",
      }}
    >
      <div className="container-card-header">
        <CardHeader
          style={{ backgroundColor: "white", padding: "32px", width: "60%" }}
          titleTypographyProps={{
            variant: "h5",
            fontWeight: "bold",
            color: "#2B2F42",
          }}
          subheaderTypographyProps={{ fontSize: "14px" }}
          title={item.name}
          subheader={item.brand}
        />
        <div className="container-price">
          <span className="text-price">{item.price.toFixed(2)}$</span>
        </div>
      </div>
      <CardMedia
        component="img"
        height="194"
        src={item.img}
        alt={item.name}
        style={{ objectFit: "contain", marginBottom: "20px" }}
      />
      <CardActions disableSpacing>
        <div>
          <IconButton onClick={handleAddRemoveFromFavourite}>
            <StarIcon
              className={isAddedToFavourites() ? "favourite-icon-added" : null}
            />
          </IconButton>
          {item.inStock ? (
            <IconButton onClick={handleAddToCart}>
              <ShoppingCartOutlinedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={handleAddRemoveFromWishlist}
              disabled={!isLoggedIn}
            >
              {isLoggedIn ? (
                <FavoriteIcon
                  className={isAddedToWishlist() ? "wishlist-icon-added" : null}
                />
              ) : null}
            </IconButton>
          )}
        </div>
        <div style={{ display: "flex", width: "63%", marginBottom: "5px" }}>
          {!item.inStock ? (
            <Paper
              style={{
                width: "160px",
                height: "45px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
              }}
              elevation={5}
            >
              <Paper
                style={{
                  width: "150px",
                  height: "35px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                elevation={5}
              >
                <span
                  style={{ color: "red", fontSize: "16px", fontWeight: "bold" }}
                >
                  Not in stock
                </span>
              </Paper>
            </Paper>
          ) : null}
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </div>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ display: "flex", flexDirection: "column" }}>
          <span>
            <b>Description:</b> {item.description}
          </span>

          {verifyCategory()}
        </CardContent>
      </Collapse>
    </Card>
  );
}

function mapStateToProps(state) {
  const {
    shopReducer: { productsAddedToFavourite, productsAddedToWishList },
  } = state;
  return {
    userId: state.userReducer.userId,
    userEmail: state.userReducer.email,
    isLoggedIn: state.userReducer.isLoggedIn,
    productsAddedToFavourite: productsAddedToFavourite,
    productsAddedToWishList: productsAddedToWishList,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
