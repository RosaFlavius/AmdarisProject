import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

toast.configure();

export default function NewClothes() {
  const [inputs, setInputs] = useState({});
  const product = { ...inputs };

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const notify = (response) => {
    if (!response) {
      toast.error("Something went wrong.", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 2000,
      });
    } else {
      toast.success(
        `Product ${response.data.name} was created with ID: ${response.data.id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: 2000,
        }
      );
    }
  };

  const verifications = () => {
    let sw = false;
    if (product.name === null) sw = true;
    if (product.brand === null) sw = true;
    if (product.description === null) sw = true;
    if (product.price <= 0) sw = true;
    if (product.img === null) sw = true;
    if (product.size < 1 || product.size > 6) sw = true;
    if (product.gender < 1 || product.gender > 3) sw = true;
    return sw;
  };

  const onSubmit = async () => {
    console.log(product);
    let sw = false;
    const verif = await verifications();
    if (verif) {
      sw = true;
    } else sw = false;
    if (!sw) {
      const response = await axios
        .post("https://localhost:7177/api/Clothes", {
          name: product.name,
          brand: product.brand,
          description: product.description,
          price: product.price,
          img: product.img,
          size: parseInt(product.size),
          gender: parseInt(product.gender),
          category: 1,
        })
        .catch((e) => console.log(e));
      console.log(response);
      if (response) {
        notify(true);
      } else {
        notify(false);
      }
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Clothes Product</h1>
          <form className="addProductForm">
            <div className="addProductItem">
              <label>Image</label>
              <input
                name="img"
                type="text"
                placeholder="Product image"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input
                name="name"
                type="text"
                placeholder="Product name"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Brand</label>
              <input
                name="brand"
                type="text"
                placeholder="Product brand"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Price</label>
              <input
                min="1"
                step="0.01"
                name="price"
                type="number"
                placeholder="Product price"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input
                name="description"
                type="text"
                placeholder="Product description"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Gender</label>
              <input
                min="1"
                max="3"
                name="gender"
                type="number"
                placeholder="Product gender"
                onChange={handleChange}
              />
            </div>
            <div className="addProductItem">
              <label>Size</label>
              <input
                min="1"
                max="6"
                name="size"
                type="number"
                placeholder="Product size"
                onChange={handleChange}
              />
            </div>
            {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
            <button onClick={onSubmit} className="addProductButton">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
