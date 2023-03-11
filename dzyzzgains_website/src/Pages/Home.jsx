import React from "react";
import Annoucement from "../components/Annoucement/Annoucement";
import Categories from "../components/Categories";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";

function Home() {
  return (
    <div>
      <Navbar />
      <Annoucement />
      <Slider />
      <Categories />
      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
