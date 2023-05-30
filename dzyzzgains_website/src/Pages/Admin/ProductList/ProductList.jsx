import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Grid } from "@mui/material";

export default function ProductList() {
  const [components, setComponents] = useState([]);

  const fetchProducts = async () => {
    const prod = await axios
      .get("https://localhost:7177/api/Product")
      .catch((e) => console.log(e));
    setComponents(prod.data);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleDelete = async (id) => {
    const response = await axios
      .delete(`https://localhost:7177/api/Product/${id}`)
      .catch((e) => console.log(e));
    if (response) {
      refreshPage();
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const columns = [
    {
      field: "name",
      headerName: "ProductName",
      flex: 2,
      renderCell: (params) => {
        return (
          <div className="productListItem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.name}
          </div>
        );
      },
    },
    { field: "brand", headerName: "ProductBrand", flex: 1 },
    {
      field: "description",
      headerName: "ProductDescription",
      flex: 2,
    },
    {
      field: "price",
      headerName: "ProductPrice",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
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
    <Grid container spacing={3} className="products-layout-data-grid">
      <Grid item xs={12} sm={5} lg={3}>
        <Sidebar />
      </Grid>
      <Grid item xs={12} sm={7} lg={8}>
        <DataGrid
          rows={components}
          disableSelectionOnClick
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          className="data-grid-products"
        />
      </Grid>
    </Grid>
  );
}
