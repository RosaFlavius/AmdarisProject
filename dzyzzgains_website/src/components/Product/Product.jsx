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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./product.styles.css";
import { addToCart, addRemoveFavourite } from "../../redux/Shop/shop_action";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";

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

function Product({ item, productsAddedToFavourite }) {
  const [expanded, setExpanded] = useState(false);

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

  const isAddedToFavourites = () => {
    return productsAddedToFavourite.find((x) => x.id === item.id);
  };

  return (
    <Card
      className="card"
      sx={{ height: expanded ? "100%" : "430px", width: "100%" }}
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
        style={{ objectFit: "contain" }}
      />
      <CardActions disableSpacing>
        <IconButton onClick={handleAddRemoveFromFavourite}>
          <FavoriteIcon
            className={isAddedToFavourites() ? "favourite-icon-added" : null}
          />
        </IconButton>
        <IconButton onClick={handleAddToCart}>
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Description:
          </Typography>
          <span style={{ color: "#696969" }}>{item.description}</span>
        </CardContent>
      </Collapse>
    </Card>
  );
}

function mapStateToProps(state) {
  const {
    shopReducer: { productsAddedToFavourite },
  } = state;
  return {
    productsAddedToFavourite: productsAddedToFavourite,
  };
}

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);
