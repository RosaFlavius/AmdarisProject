import React from "react";
import Annoucement from "../components/Annoucement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "../components/Products";

function ListOfProducts() {
  return (
    <div>
      <Annoucement />
      <Navbar />
      <Products />
      <Footer />
    </div>
  );
}

export default ListOfProducts;
