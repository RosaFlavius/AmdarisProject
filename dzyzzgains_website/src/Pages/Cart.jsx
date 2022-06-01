import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { removeAllFromCart, removeFromCart, adjustQty} from "../redux/Shop/shop_action";
import styled from "styled-components";
import Announcement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";
import LogoIMG from "../images/Logo.png"
import { Button } from "@mui/material";
import { grey } from '@mui/material/colors';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const RemoveButtonContainer = styled.div`
    height: 10px
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 100px
`
const RemoveButton = styled.button`
  background-color: teal; 
  border: none;
  color: white;
  padding: 10px 25px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  cursor: pointer;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductPRICE = styled.span ``;

const ProductBrand = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SmallContainer = styled.div`
`;


const SummaryItemPrice = styled.span`

`;

const Cart = ({productsAddedToCart, removeFromCart, removeAllFromCart, adjustQty}) => {
  
  

  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // const [stripeToken, setStripeToken] = useState(null);
  // const history = useHistory();

  const increaseQty = (productId) => {
    productsAddedToCart.forEach((product) => {
      if(productId===product.id)
      {
        adjustQty(product, product.qty + 1);
      }

    })
    
  };
  const decreaseQty = (productId) => {
    productsAddedToCart.forEach((product) => {
      if(productId===product.id)
      {
        if (product.qty === 1) {
          adjustQty(product, product.qty);
        } else {
          adjustQty(product, product.qty - 1);
        }
      }
      
    })
    
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
  const routeChange = () =>{ 
    let path = `/products`; 
    navigate(path);
  }


  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>YOUR BAG</Title>
        <Top>
          <TopButton  onClick={routeChange} >
            CONTINUE SHOPPING</TopButton>
            <TopButton onClick={()=> removeAllFromCart()}>EMPTY CART</TopButton>
        </Top>
        <Bottom>
          <Info>
          {productsAddedToCart &&
          productsAddedToCart.map((product) => (
              <Product item={product} key={product.id}>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Product:</b> {product.name}
                    </ProductName>
                    <ProductPRICE>
                      <b>Price: </b>{product.price}<b>$</b>
                    </ProductPRICE>
                    <ProductBrand>
                      <b>Brand: </b>{product.brand}
                    </ProductBrand>
                  </Details>
                </ProductDetail>
                <RemoveButtonContainer>
                <RemoveButton 
                onClick={() => removeFromCart(product)}>Remove</RemoveButton>
                </RemoveButtonContainer>
                <PriceDetail>
                  <ProductAmountContainer>
                    <RemoveIcon onClick={()=>decreaseQty(product.id)}/>
                    <ProductAmount >{product.qty}</ProductAmount>
                    <AddIcon onClick={()=>increaseQty(product.id)}/>
                  </ProductAmountContainer>
                  <ProductPrice>
                    $ {(Math.round(product.price * 100) / 100* product.qty).toFixed(2)}
                  </ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Number of items</SummaryItemText>
              <SummaryItemPrice>{totalItems}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SmallContainer>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>  
              <SummaryItemPrice>${totalPrice}</SummaryItemPrice> 
            </SummaryItem>
            
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
              <Button size="large" style={{ backgroundColor: grey[900], color:grey[50], width: '100%' }}>CHECKOUT NOW</Button>
            </StripeCheckout>
            </SmallContainer>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
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