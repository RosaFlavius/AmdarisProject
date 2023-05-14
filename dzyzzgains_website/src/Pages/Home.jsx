import React from "react";
import Annoucement from "../components/Annoucement/Annoucement";
import Categories from "../components/Categories/Categories";
import Footer from "../components/Footer/Footer";
import Navbar from "../components/Navbar/Navbar";
import Newsletter from "../components/Newsletter/Newsletter";
import Slider from "../components/Slider";

function Home() {
  return (
    <div>
      {/* <Annoucement /> */}
      <Slider />
      <Categories />
      {/* <Newsletter /> */}
    </div>
  );
}

export default Home;
