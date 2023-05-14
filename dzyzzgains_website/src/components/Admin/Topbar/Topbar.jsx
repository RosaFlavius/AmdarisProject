import React from "react";
import "./styles.css";
import { teal } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { logOut } from "../../../redux/User/user_actions";
import { connect } from "react-redux";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

function Topbar({ isLoggedIn, email, logOut }) {
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">DZyzzGains Admin</span>
        </div>
        <div className="topRight">
          {isLoggedIn ? (
            <>
              <div className="emailDiv">Welcome admin, {email}!</div>
              <div className="Space"> </div>
              <Link to={"/"} style={{ textDecoration: "none" }}>
                <LogoutOutlinedIcon
                  onClick={() => logOut(email)}
                  size="large"
                  style={{
                    color: teal[300],
                    width: "100%",
                  }}
                >
                  LOG OUT
                </LogoutOutlinedIcon>
              </Link>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.userReducer.isLoggedIn,
    email: state.userReducer.email,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    logOut: (email) => {
      dispatch(logOut(email));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topbar);
