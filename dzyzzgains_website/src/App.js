import "./App.css";
import React from "react";
import Home from "./Pages/Home";
import ListOfProducts from "./Pages/ListOfProducts";
import Cart from "./Pages/Cart/Cart";
import AdminPage from "./Pages/Admin/AdminPage/AdminPage";
import NewClothes from "./Pages/Admin/NewProduct/NewClothes";
import NewEquipment from "./Pages/Admin/NewProduct/NewEquipment";
import NewSupplement from "./Pages/Admin/NewProduct/NewSupplement";
import ProductList from "./Pages/Admin/ProductList/ProductList";
import ProductAdmin from "./Pages/Admin/Product/ProductAdmin";
import UserList from "./Pages/Admin/UserList/UserList";
import NewUser from "./Pages/Admin/NewUser/NewUser";
import UserAdmin from "./Pages/Admin/User/User";
import Register from "./Pages/Register/Register";
import Login from "./Pages/Login/Login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { connect } from "react-redux";
import Favorite from "./Pages/Favorite/Favorite";
import Wishlist from "./Pages/Wishlist/Wishlist";

function App({ admin }) {
  return (
    <>
      <Router>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
          }}
        >
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/products" element={<ListOfProducts />} />
            <Route
              exact
              path="/products/:categories"
              element={<ListOfProducts />}
            />
            <Route exact path="/wishlist" element={<Wishlist />} />
            <Route exact path="/cart" element={<Cart />} />
            <Route exact path="/favorite" element={<Favorite />} />
            <Route exact path="/admin" element={<AdminPage />} />
            <Route
              exact
              path="/admin/admin_products"
              element={<ProductList />}
            />
            <Route
              exact
              path="/admin/admin_newClothes"
              element={<NewClothes />}
            />
            <Route
              exact
              path="/admin/admin_newSupplement"
              element={<NewSupplement />}
            />
            <Route
              exact
              path="/admin/admin_newEquipment"
              element={<NewEquipment />}
            />
            <Route
              exact
              path="/admin/admin_product/:id"
              element={<ProductAdmin />}
            />
            <Route exact path="/admin/admin_users" element={<UserList />} />
            <Route exact path="/admin/admin_newUser" element={<NewUser />} />
            <Route exact path="/admin/admin_user/:id" element={<UserAdmin />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/login" element={<Login />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    admin: state.userReducer.admin,
  };
};

export default connect(mapStateToProps)(App);
