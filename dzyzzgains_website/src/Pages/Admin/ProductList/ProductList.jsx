import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Chip, Grid, IconButton } from "@mui/material";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { useDispatch } from "react-redux";
import * as shoppingActions from "../../../redux/Shop/shop_action";
import {
  addRemoveFavourite,
  addRemoveWishlist,
  removeFromCart,
} from "../../../redux/Shop/shop_action";

const ProductList = ({
  productsAddedToCart,
  productsAddedToFavourite,
  productsAddedToWishList,
  userId,
  userEmail,
}) => {
  const [components, setComponents] = useState([]);
  const [isUpdated, setIsUpdated] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const prod = await axios
      .get("https://localhost:7177/api/Product")
      .catch((e) => console.log(e));
    setComponents(prod.data);
  };

  const handleDelete = async (id) => {
    setIsUpdated(true);
    await axios
      .delete(`https://localhost:7177/api/Product/${id}`)
      .catch((e) => console.log(e));
    setIsUpdated(false);
  };

  const handleInStock = async (item) => {
    setIsUpdated(true);
    await axios
      .patch("https://localhost:7177/api/Product/inStock/" + `${item.id}`)
      .catch((e) => console.log(e));

    let verifyInWishlist = productsAddedToWishList.find(
      (prod) => prod.id === item.id
    );
    let verifyInFavorites = productsAddedToFavourite.find(
      (prod) => prod.id === item.id
    );

    if (verifyInWishlist) {
      dispatch(addRemoveWishlist({ ...item }));
      if (!verifyInFavorites) {
        dispatch(addRemoveFavourite({ ...item }));
      }
    }
    setIsUpdated(false);
  };
  const handleOutOfStock = async (item) => {
    setIsUpdated(true);
    await axios
      .patch("https://localhost:7177/api/Product/outOfStock/" + `${item.id}`)
      .catch((e) => console.log(e));

    let verifyInCart = productsAddedToCart.find((prod) => prod.id === item.id);
    if (verifyInCart) {
      dispatch(removeFromCart({ ...item }));
    }
    let verifyInWishlist = productsAddedToWishList.find(
      (prod) => prod.id === item.id
    );
    if (!verifyInWishlist && verifyInCart) {
      dispatch(addRemoveWishlist({ ...item }));
      await axios
        .post(`https://localhost:7177/api/Notification/${userEmail}`, {
          productId: item.id,
          userId: userId,
        })
        .catch((e) => console.log(e));
    }

    setIsUpdated(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [isUpdated]);

  const columns = [
    {
      field: "name",
      headerName: "ProductName",
      flex: 2,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "brand", headerName: "ProductBrand", flex: 1 },
    {
      field: "description",
      headerName: "ProductDescription",
      flex: 2,
    },
    {
      field: "price",
      headerName: "ProductPrice",
      flex: 1,
      renderCell: (params) => {
        return <span>{params.row.price}$</span>;
      },
    },
    {
      field: "inStock",
      headerName: "In Stock",
      flex: 1,
      renderCell: (params) => {
        return (
          <Chip
            label={params.row.inStock ? "Yes" : "No"}
            className={params.row.inStock ? "chip-inStock" : "chip-outOfStock"}
          />
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      flex: 2,
      renderCell: (params) => {
        return (
          <div>
            <Link to={"/admin/admin_product/" + params.row.id}>
              <Button variant="contained" className="productListEdit">
                Edit
              </Button>
            </Link>
            <IconButton onClick={() => handleDelete(params.row.id)}>
              <DeleteOutline className="productListDelete" />
            </IconButton>
            <Button
              onClick={
                !params.row.inStock
                  ? () => handleInStock(params.row)
                  : () => handleOutOfStock(params.row)
              }
              varaint="contained"
              className={
                !params.row.inStock
                  ? "add-inStock-button"
                  : "remove-fromStock-button"
              }
            >
              {!params.row.inStock ? "Add In Stock" : "Remove From Stock"}
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <Grid container spacing={3} className="products-layout-data-grid">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={9}>
        <DataGrid
          rows={components}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          className="data-grid-products"
        />
      </Grid>
    </Grid>
  );
};

const mapStateToProps = (state) => {
  return {
    productsAddedToCart: state.shopReducer.productsAddedToCart,
    productsAddedToFavourite: state.shopReducer.productsAddedToFavourite,
    productsAddedToWishList: state.shopReducer.productsAddedToWishList,
    userId: state.userReducer.userId,
    userEmail: state.userReducer.email,
  };
};
function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
