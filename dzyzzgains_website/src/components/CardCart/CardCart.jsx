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
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import "./card-cart.styles.css";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as shoppingActions from "../../redux/Shop/shop_action";
import { Button, Grid } from "@mui/material";

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

function CardCart({ item, removeFromCart, increaseQty, decreaseQty }) {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useDispatch();

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart({ ...item }));
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
          <span className="text-price">
            {((Math.round(item.price * 100) / 100) * item.qty).toFixed(2)}$
          </span>
        </div>
      </div>
      <CardMedia
        component="img"
        height="194"
        src={item.img}
        alt={item.name}
        style={{ objectFit: "contain" }}
      />
      <CardActions disableSpacing className="cart-card-actions">
        <Grid container>
          <Grid
            item
            xs={2}
            sm={4}
            md={4}
            lg={4}
            className="grid-item-action-cart"
          >
            <ExpandMore
              expand={expanded}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon style={{ color: "black" }} />
            </ExpandMore>
          </Grid>
          <Grid
            item
            xs={6}
            sm={4}
            md={4}
            lg={4}
            className="add-remove-container grid-item-action-cart"
          >
            <IconButton
              className="cart-icon-button"
              onClick={() => increaseQty(item.id)}
            >
              <AddIcon style={{ color: "black" }} />
            </IconButton>
            <span className="quantity-text">{item.qty}</span>
            <IconButton
              className="cart-icon-button"
              onClick={() => decreaseQty(item.id)}
            >
              <RemoveIcon style={{ color: "black" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={4}
            className="remove-button-container grid-item-action-cart"
          >
            <Button
              className="remove-button-cart"
              variant="outlined"
              onClick={() => handleRemoveFromCart()}
            >
              Remove
            </Button>
          </Grid>
        </Grid>
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

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(null, mapDispatchToProps)(CardCart);
