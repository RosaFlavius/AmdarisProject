import { Grid, IconButton } from "@mui/material";
import React from "react";
import { Category } from "../../Enums/Category.ts";
import { ClothesGender } from "../../Enums/ClothesGender.ts";
import { ClothesSize } from "../../Enums/ClothesSize.ts";
import { EquipmentType } from "../../Enums/EquipmentType.ts";
import { SupplementsType } from "../../Enums/SupplementsType.ts";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { addRemoveWishlist } from "../../redux/Shop/shop_action";
import { connect } from "react-redux";
import "./wishlist-card.styles.css";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import axios from "axios";

function WishlistCard({ item, userId }) {
  const dispatch = useDispatch();

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

  const handleRemoveFromWishlist = async () => {
    dispatch(addRemoveWishlist({ ...item }));
    await axios
      .delete(`https://localhost:7177/api/Notification/${userId}/${item.id}`)
      .catch((e) => console.log(e));
  };

  return (
    <Grid container spacing={3} className="container-wish-card">
      <Grid item xs={10}>
        <Grid container spacing={3}>
          <Grid item md={5} lg={5}>
            <Grid container spacing={3} className="center-item-wish">
              <Grid item xs={12} className="center-item-wish">
                <span className="wish-name-text">{item.name}</span>
              </Grid>
              <Grid item xs={12} className="center-item-wish">
                <img
                  src={item.img}
                  style={{
                    objectFit: "contain",
                    height: "150px",
                    width: "150px",
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={6} lg={6}>
            <Grid
              container
              spacing={3}
              className="center-item-wish"
              style={{ padding: "20px" }}
            >
              <Grid item xs={8}>
                <span className="text-wish">
                  <b>Brand: </b>
                  {item.brand}
                </span>
              </Grid>
              <Grid item xs={8}>
                <span className="text-wish">
                  <b>Price: </b>
                  {item.price}$
                </span>
              </Grid>
              <Grid item xs={8}>
                <span className="text-wish">
                  <b>Description: </b>
                  {item.description}
                </span>
              </Grid>
              <Grid item xs={8}>
                <span className="text-wish">
                  <b>Category: </b>
                  {Category[item.category]}
                </span>
              </Grid>
              <Grid item xs={8}>
                {verifyCategory()}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={1} className="delete-container-wish">
        <IconButton onClick={handleRemoveFromWishlist}>
          <FavoriteIcon className="icon-wish" style={{ color: "#FC6569" }} />
        </IconButton>
      </Grid>
    </Grid>
  );
}
const mapStateToProps = (state) => {
  return {
    userId: state.userReducer.userId,
  };
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistCard);
