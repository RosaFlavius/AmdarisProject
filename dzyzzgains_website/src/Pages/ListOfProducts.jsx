import React from "react";
import Annoucement from "../components/Annoucement/Annoucement";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Products from "../components/Products/Products";

function ListOfProducts() {
  return (
    <div>
      <Navbar />
      <Annoucement />
      <Products />
      <Footer />
    </div>
  );
}

export default ListOfProducts;
