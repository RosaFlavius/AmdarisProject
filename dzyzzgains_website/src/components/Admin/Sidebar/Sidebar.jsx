import "./styles.css";
import { LineStyle, PermIdentity, Storefront } from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const page = location.pathname.split("/")[2];

  return (
    <div className="sidebar">
      <div>
        <h3 className="sidebarTitle">Dashboard</h3>
        <ul className="sidebarList">
          <Link to="/admin" className="link">
            <li
              className={
                page !== undefined
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <LineStyle className="sidebarIcon" />
              Home
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <h3 className="sidebarTitle">Quick Menu</h3>
        <ul className="sidebarList">
          <Link to="/admin/admin_users" className="link">
            <li
              className={
                page !== "admin_users"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <PermIdentity className="sidebarIcon" />
              Users
            </li>
          </Link>
          <Link to="/admin/admin_products" className="link">
            <li
              className={
                page !== "admin_products"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <Storefront className="sidebarIcon" />
              Products
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <h3 className="sidebarTitle">Product</h3>
        <ul className="sidebarList">
          <Link to="/admin/admin_newClothes" className="link">
            <li
              className={
                page !== "admin_newClothes"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
              AddClothesProduct
            </li>
          </Link>
          <Link to="/admin/admin_newEquipment" className="link">
            <li
              className={
                page !== "admin_newEquipment"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
              AddEquipmentProduct
            </li>
          </Link>
          <Link to="/admin/admin_newSupplement" className="link">
            <li
              className={
                page !== "admin_newSupplement"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
              AddSupplementProduct
            </li>
          </Link>
        </ul>
      </div>
      <div>
        <h3 className="sidebarTitle">User</h3>
        <ul className="sidebarList">
          <Link to="/admin/admin_newUser" className="link">
            <li
              className={
                page !== "admin_newUser"
                  ? "sidebarListItem"
                  : "sidebarListItem active"
              }
            >
              <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
              AddUser
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
