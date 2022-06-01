import './App.css';
import React from 'react';
import Home from './Pages/Home';
import ListOfProducts from './Pages/ListOfProducts';
import Product from './Pages/Product'
import Cart from './Pages/Cart';
import AdminPage from './Pages/Admin/AdminPage/AdminPage';
import NewProduct from './Pages/Admin/NewProduct/NewProduct'
import ProductList from './Pages/Admin/ProductList/ProductList'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {

  return (

    <Router>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/products" element={<ListOfProducts/>}/>
        <Route exact path="/products/:categories" element={<ListOfProducts/>}/>
        <Route exact path="/product/:id" element={<Product />}/>
        <Route exact path="/cart" element={<Cart/>}/>
        <Route exact path="/admin" element={<AdminPage/>}/>
        <Route exact path="/admin/admin_products" element={<ProductList/>}/>
        {/* <Route exact path="/admin/admin_newProduct" element={<NewProduct/>}/> */}

      </Routes>
    </Router>
    
  
  );
}

export default App;
