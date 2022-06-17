import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

toast.configure();

export default function NewEquipment() {
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
        autoClose: false,
      });
    } else if (response.status === 201) {
      toast.success(
        `Product ${response.product.Name} was created with ID: ${response.product.Id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
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
    if (product.typeOfEquipment < 1 || product.typeOfEquipment > 7) sw = true;
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
        .post("https://localhost:7177/api/Equipment", {
          name: product.name,
          brand: product.brand,
          description: product.description,
          price: product.price,
          img: product.img,
          typeOfEquipment: parseInt(product.typeOfEquipment),
          category: 1,
        })
        .catch((e) => console.log(e));
      console.log(response);
      notify(response);
    }
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newProduct">
          <h1 className="addProductTitle">New Equipment Product</h1>
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
                step="0.01"
                min="1"
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
              <label>Type Of Equipment</label>
              <input
                min="1"
                max="7"
                name="typeOfEquipment"
                type="number"
                placeholder="Type Of Equipment"
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
