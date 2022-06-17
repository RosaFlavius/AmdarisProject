import "./styles.css";
import { productData } from "../../../dummyData";
import Chart from "../../../components/Admin/Chart/Chart";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import { Publish } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../redux/Shop/shop_action";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ProductAdmin() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [product, setProduct] = useState({});
  const [inputs, setInputs] = useState({});
  const prod = { ...inputs };

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

  const onSubmitUpdate = async () => {
    console.log(prod);
    const response = await axios
      .put("https://localhost:7177/api/Product/" + `${id}`, {
        id: id,
        name: prod.name,
        brand: prod.brand,
        description: prod.description,
        price: prod.price,
        img: prod.img,
        category: 1,
      })
      .catch((e) => console.log(e));
    console.log(response);
    notify(response);
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get("/product/" + id);
        setProduct(res.data);
      } catch {}
    };
    getProduct();
  }, [id]);
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Product</h1>
          </div>
          <div className="productTop">
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={product.img} alt="" className="productInfoImg" />
                <span className="productName">{product.name}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItemId ">
                  <span className="productInfoKey">Id:</span>
                  <span className="productInfoValue">{product.id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Brand:</span>
                  <span className="productInfoValue">{product.brand}</span>
                </div>
                <div className="productInfoItemDescription">
                  <span className="productInfoKey">Description:</span>
                  <span className="productInfoValue">
                    {product.description}
                  </span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Price:</span>
                  <span className="productInfoValue">{product.price}$</span>
                </div>
                <div className="productInfoItem ">
                  <span className="productInfoKey">ImageLink:</span>
                  <span className="productInfoValue">{product.img}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Product Name</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Product Name"
                  onChange={handleChange}
                />
                <label>Product Brand</label>
                <input
                  name="brand"
                  type="text"
                  placeholder="Product Brand"
                  onChange={handleChange}
                />
                <label>Product Description</label>
                <input
                  name="description"
                  type="text"
                  placeholder="Product Description"
                  onChange={handleChange}
                />
                <label>Product Price</label>
                <input
                  name="price"
                  type="text"
                  placeholder="Product Price"
                  min="1"
                  onChange={handleChange}
                />
                <label>Product Image</label>
                <input
                  name="img"
                  type="text"
                  placeholder="Product Image"
                  onChange={handleChange}
                />
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img src={product.img} alt="" className="productUploadImg" />
                </div>
                <button className="productButton" onClick={onSubmitUpdate}>
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
