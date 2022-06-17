import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function ProductList() {
  const [components, setComponents] = useState([]);

  const fetchProducts = async () => {
    const prod = await axios
      .get("https://localhost:7177/api/Product")
      .catch((e) => console.log(e));
    const items = [];
    for (const iterator of prod.data) {
      const item = {
        id: iterator.id,
        name: iterator.name,
        brand: iterator.brand,
        description: iterator.description,
        img: iterator.img,
        price: iterator.price,
      };
      items.push(item);
    }
    setComponents(items);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleDelete = async (id) => {
    const response = await axios
      .delete("https://localhost:7177/api/Product/" + `${id}`)
      .catch((e) => console.log(e));
    if (response) {
      refreshPage();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    { field: "id", headerName: "ProductID", width: 90 },
    {
      field: "name",
      headerName: "ProductName",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "brand", headerName: "ProductBrand", width: 200 },
    {
      field: "description",
      headerName: "ProductDescription",
      width: 200,
    },
    {
      field: "price",
      headerName: "ProductPrice",
      width: 160,
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/admin_product/" + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="productList">
          <DataGrid
            rows={components}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
        <br />
        <div style={{ display: "flex", justifyContent: "center" }}></div>
      </div>
    </div>
  );
}
