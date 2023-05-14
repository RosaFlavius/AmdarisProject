import React from "react";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import HomeAdminPage from "../HomeAdminPage/HomeAdminPage";
import "./styles.css";

function AdminPage() {
  return (
    <div>
      <div className="container">
        <Sidebar />
        <HomeAdminPage />
      </div>
    </div>
  );
}

export default AdminPage;
