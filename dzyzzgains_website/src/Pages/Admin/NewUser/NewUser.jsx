import "./styles.css";
import Sidebar from "../../../components/Admin/Sidebar/Sidebar";
import Topbar from "../../../components/Admin/Topbar/Topbar";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function NewUser() {
  const [inputs, setInputs] = useState({});

  const user = { ...inputs };
  var adminBool;

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
        `User ${response.user.Name} was created with ID: ${response.user.Id}`,
        {
          position: toast.POSITION.TOP_CENTER,
          autoClose: false,
        }
      );
    }
  };

  const onSubmit = async () => {
    console.log(user);
    if (user.admin === "true") adminBool = new Boolean(true);
    else {
      adminBool = new Boolean(false);
    }
    const response = await axios
      .post("https://localhost:7177/api/User", {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
        dateOfBirth: user.dateOfBirth,
        phone: user.phone,
        country: user.country,
        city: user.city,
        address: user.address,
        admin: adminBool,
      })
      .catch((e) => console.log(e));
    console.log(response);
    notify(response);
  };

  return (
    <div>
      <Topbar />
      <div className="container">
        <Sidebar />
        <div className="newUser">
          <h1 className="newUserTitle">New User</h1>
          <form className="newUserForm">
            <div className="newUserItem">
              <label>Email</label>
              <input
                name="email"
                type="email"
                placeholder="User Email"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Password</label>
              <input
                name="password"
                type="password"
                placeholder="User Password"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>First Name</label>
              <input
                name="firstName"
                type="text"
                placeholder="First Name User"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Last Name</label>
              <input
                name="lastName"
                type="text"
                placeholder="Last Name User"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>DateOfBirth</label>
              <input
                name="dateOfBirth"
                type="text"
                placeholder="DateOfBirth"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Phone</label>
              <input
                name="phone"
                type="text"
                placeholder="Phone"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Country</label>
              <input
                name="country"
                type="text"
                placeholder="Country User"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>City</label>
              <input
                name="city"
                type="text"
                placeholder="City User"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Address</label>
              <input
                name="address"
                type="text"
                placeholder="Address User"
                onChange={handleChange}
              />
            </div>
            <div className="newUserItem">
              <label>Admin</label>
              <div className="newUserGender">
                <input
                  type="radio"
                  name="admin"
                  id="yes"
                  value={true}
                  onChange={handleChange}
                />
                <label htmlFor="yes">Yes</label>
                <input
                  type="radio"
                  name="admin"
                  id="no"
                  value={false}
                  onChange={handleChange}
                />
                <label htmlFor="no">No</label>
              </div>
            </div>
            <button onClick={onSubmit} className="newUserButton">
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
