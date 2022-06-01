import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

const Container = styled.div`
    height: 80px;
    
`;

const Wrapper = styled.div`
    padding : 10px 20px;
    display: flex;
    justify-content: space-between;
`;

const Left = styled.div`
    display: flex;
    align-items: center;
    flex : 1;
`;
const Language = styled.span`
    font-size: 14px;
    cursor: pointer;
`;
const SearchContainer = styled.div`
    border: 0.5px solid lightgrey;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`;
const Input = styled.input`
    border: none;
`;
const Center = styled.div`
    flex : 1;
    text-align: center;
`;

const Logo = styled.h1`
    font-weight: bold;
`;

const Right = styled.div`
    flex : 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;  

const MenuItem = styled.div`
    font-size: 14px;
    cursor: pinter;
    margin-left: 25px;
`
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


function Navbar({productsAddedToCart}) {
    
    const [totalItems, setTotalItems] = useState(0);

    useEffect(() => {
        let items = 0;
        productsAddedToCart.find((item) => {
          items += item.qty;
        });
        setTotalItems(items);
      }, [
        productsAddedToCart,
        totalItems,
        setTotalItems,
      ]);
  return (
    <div>
        <Container>

            <Wrapper>
                <Left>
                    <Language>EN</Language>
                    <SearchContainer>
                        <Input/>
                        <SearchIcon style = {{color: "gray", fontSize:16}}/>
                    </SearchContainer>
                </Left>
                <Center>
                    <Logo>DZyzzGains</Logo>
                </Center>
                <Right>
                    <MenuItem>REGISTER</MenuItem>
                    <MenuItem>SIGN IN</MenuItem>
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
  )
}

const mapStateToProps = (state) => {
    return {
      productsAddedToCart: state.shopReducer.productsAddedToCart,
    };
  };

  export default connect(mapStateToProps)(Navbar); 