import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@mui/icons-material";
import { Button } from "@mui/material";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import "./styles.css";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicRequest } from "../../../redux/Shop/shop_action";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function User() {
  const location = useLocation();
  const id = location.pathname.split("/")[3];
  const [user, setUser] = useState({});
  const [inputs, setInputs] = useState({});
  const usr = { ...inputs };

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
        `User ${response.user.name} was created with ID: ${response.user.id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        }
      );
    }
  };

  const onSubmitUpdate = async () => {
    console.log(usr);
    const response = await axios
      .put("https://localhost:7177/api/User/" + `${id}`, {
        id: usr.id,
        firstName: usr.firstName,
        lastName: usr.lastName,
        email: usr.email,
        password: usr.password,
        dateOfBirth: usr.dateOfBirth,
        phone: usr.phone,
        country: usr.country,
        city: usr.city,
        address: usr.address,
        admin: usr.admin,
      })
      .catch((e) => console.log(e));
    console.log(response);
    notify(response);
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await publicRequest.get("/user/" + id);
        setUser(res.data);
      } catch {}
    };
    getUser();
  }, [id]);
  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="user">
          <div className="userTitleContainer">
            <h1 className="userTitle">Edit User</h1>
          </div>
          <div className="userContainer">
            <div className="userShow">
              <div className="userShowTop">
                <div className="userShowTopTitle">
                  <span className="userShowUsername">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className="userShowUserTitle">{user.email}</span>
                </div>
              </div>
              <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                  <PermIdentity className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.lastName} {user.firstName}
                  </span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.address}</span>
                </div>
                <div className="userShowInfo">
                  <CalendarToday className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.dateOfBirth}</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                  <PhoneAndroid className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.phone}</span>
                </div>
                <div className="userShowInfo">
                  <MailOutline className="userShowIcon" />
                  <span className="userShowInfoTitle">{user.email}</span>
                </div>
                <div className="userShowInfo">
                  <LocationSearching className="userShowIcon" />
                  <span className="userShowInfoTitle">
                    {user.city} | {user.country}
                  </span>
                </div>
              </div>
            </div>
            <div className="userUpdate">
              <span className="userUpdateTitle">Edit</span>
              <form className="userUpdateForm">
                <div className="userUpdateLeft">
                  <div className="userUpdateItem">
                    <label>Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="Email"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Password</label>
                    <input
                      name="password"
                      type="password"
                      placeholder="Password"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>FirstName</label>
                    <input
                      name="firstName"
                      type="text"
                      placeholder="FirstName"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>LastName</label>
                    <input
                      name="lastName"
                      type="text"
                      placeholder="LastName"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>DateOfBirth</label>
                    <input
                      name="dateOfBirth"
                      type="text"
                      placeholder="DateOfBirth"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Phone</label>
                    <input
                      name="phone"
                      type="text"
                      placeholder="Phone"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Country</label>
                    <input
                      name="country"
                      type="text"
                      placeholder="Country"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>City</label>
                    <input
                      name="city"
                      type="text"
                      placeholder="City"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="userUpdateItem">
                    <label>Address</label>
                    <input
                      name="address"
                      type="text"
                      placeholder="Address"
                      className="userUpdateInput"
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="userUpdateRight">
                  {/* <div className="userUpdateUpload">
                    <img
                      className="userUpdateImg"
                      src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                      alt=""
                    />
                    <label htmlFor="file">
                      <Publish className="userUpdateIcon" />
                    </label>
                    <input type="file" id="file" style={{ display: "none" }} />
                  </div> */}
                  <Button
                    size="large"
                    onClick={onSubmitUpdate}
                    className="userUpdateButton"
                  >
                    Update
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
