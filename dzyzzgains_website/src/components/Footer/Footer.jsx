import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlinedIcon from "@mui/icons-material/MailOutlined";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LogoIMG from "../../images/Logo.png";
import "./footer.styles.css";
import { Grid } from "@mui/material";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const location = useLocation();
  const verifyAdminPath = location?.pathname.includes("admin");
  if (verifyAdminPath) {
    return null;
  }
  return (
    <Grid container className="container-footer">
      <Grid item md={4} xs={12} className="details-container">
        <h1>DZyzzGains</h1>
        <p className="description">What's new? You can find us on:</p>
        <div className="icon-container">
          <div
            className="icon-social-media"
            style={{ backgroundColor: "#3B5999" }}
          >
            <FacebookIcon />
          </div>
          <div
            className="icon-social-media"
            style={{ backgroundColor: "#E4405F" }}
          >
            <InstagramIcon />
          </div>
          <div
            className="icon-social-media"
            style={{ backgroundColor: "#55ACEE" }}
          >
            <TwitterIcon />
          </div>
        </div>
      </Grid>
      <Grid item md={4} xs={12} className="image-container-footer">
        <div style={{ height: "300px" }}>
          <img src={LogoIMG} className="logo-image" />
        </div>
      </Grid>
      <Grid item md={4} xs={12} className="grid-contact-details">
        <Grid container className="contact-details-container">
          <Grid item xs={12}>
            <h3>Contact</h3>
          </Grid>
          <Grid item xs={12} className="contact-item">
            <LocationOnIcon style={{ marginRight: "10px" }} /> Camin 22C, Aleea
            Stundetilor
          </Grid>
          <Grid item xs={12} className="contact-item">
            <PhoneIcon style={{ marginRight: "10px" }} /> 0734892470
          </Grid>
          <Grid item xs={12} className="contact-item">
            <MailOutlinedIcon style={{ marginRight: "10px" }} />{" "}
            flavius.rosa@amdaris.com
          </Grid>
          <img src="https://i.ibb.co/Qfvn4z6/payment.png" className="payment" />
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Footer;
