import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserList() {
  const [components, setComponents] = useState([]);

  const fetchUsers = async () => {
    const usr = await axios
      .get("https://localhost:7177/api/User")
      .catch((e) => console.log(e));
    const users = [];
    for (const iterator of usr.data) {
      const user = {
        id: iterator.id,
        firstName: iterator.firstName,
        lastName: iterator.lastName,
        email: iterator.email,
        password: iterator.password,
        dateOfBirth: iterator.dateOfBirth,
        phone: iterator.phone,
        country: iterator.country,
        city: iterator.city,
        address: iterator.address,
        admin: iterator.admin,
      };
      users.push(user);
    }
    setComponents(users);
  };

  function refreshPage() {
    window.location.reload();
  }

  const handleDelete = async (id) => {
    const response = await axios
      .delete("https://localhost:7177/api/User/" + `${id}`)
      .catch((e) => console.log(e));
    if (response) {
      refreshPage();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "password", headerName: "Password", width: 200 },
    {
      field: "firstName",
      headerName: "FirstName",
      width: 190,
    },
    {
      field: "lastName",
      headerName: "LastName",
      width: 200,
    },
    {
      field: "dateOfBirth",
      headerName: "DateOfBirth",
      width: 200,
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 200,
    },
    {
      field: "country",
      headerName: "Country",
      width: 160,
    },
    {
      field: "city",
      headerName: "City",
      width: 160,
    },
    {
      field: "address",
      headerName: "Address",
      width: 200,
    },
    {
      field: "admin",
      headerName: "IsAdmin",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/admin/admin_user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="userListDelete"
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
        <div className="userList">
          <DataGrid
            rows={components}
            disableSelectionOnClick
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      </div>
    </div>
  );
}
