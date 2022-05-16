import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

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



function Navbar() {
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
                        <Badge badgeContent={4} color="primary">
                            <ShoppingCartOutlinedIcon/>
                        </Badge>
                    </MenuItem>
                </Right>
            </Wrapper>
        </Container>
    </div>
  )
}

export default Navbar