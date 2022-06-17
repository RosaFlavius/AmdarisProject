import "./styles.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
} from "@mui/icons-material";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Home
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/admin_users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Users
              </li>
            </Link>
            <Link
              to="/admin/admin_products"
              className="link"
              // onClick={fetchProducts}
            >
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Products
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Product</h3>
          <ul className="sidebarList">
            <Link to="/admin/admin_newClothes" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
                AddClothesProduct
              </li>
            </Link>
            <Link to="/admin/admin_newEquipment" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
                AddEquipmentProduct
              </li>
            </Link>
            <Link to="/admin/admin_newSupplement" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
                AddSupplementProduct
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">User</h3>
          <ul className="sidebarList">
            <Link to="/admin/admin_newUser" className="link">
              <li className="sidebarListItem">
                <AddCircleOutlineOutlinedIcon className="sidebarIcon" />
                AddUser
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
