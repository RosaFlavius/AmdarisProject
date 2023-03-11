import styled from "styled-components";
import Announcement from "../components/Annoucement/Annoucement";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Newsletter from "../components/Newsletter";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../redux/Shop/shop_action";
import { addToCart } from "../redux/Shop/shop_action";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as shoppingActions from "../redux/Shop/shop_action";

const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 100%;
  height: 90vh;
  object-fit: cover;
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
`;

const Title = styled.h1`
  font-weight: 200;
`;

const Brand = styled.h2`
  font-weight: 200;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 100px 0px;
`;

const Button = styled.button`
  padding: 15px;
  border: 3px solid teal;
  background-color: white;
  cursor: pointer;
  font-weight: 500;
  &:hover {
    background-color: #f8f4f4;
  }
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);

  const handleClick = () => {
    dispatch(addToCart({ ...product }));
  };
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.name}</Title>
          <Brand>Brand: {product.brand}</Brand>
          <Desc>{product.description}</Desc>
          <Price>$ {product.price}</Price>
          <AddContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

function mapDispatchToProps(dispatch) {
  return { ...bindActionCreators(shoppingActions, dispatch) };
}

export default connect(mapDispatchToProps)(Product);
