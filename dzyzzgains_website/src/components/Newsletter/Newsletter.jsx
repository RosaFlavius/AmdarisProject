import SendIcon from "@mui/icons-material/Send";
import { Button, Grid } from "@mui/material";
import "./newsletter.styles.css";

const Newsletter = () => {
  return (
    <Grid container className="container-newsletter">
      <Grid item xs={12} lg={7}>
        <span className="title">Newsletter</span>
      </Grid>
      <Grid item xs={12} lg={7}>
        <span className="description">
          Get timely updates from your favorite products.
        </span>
      </Grid>
      <Grid item xs={12} lg={7} className="input-container">
        <input className="input-newsletter" placeholder="Your email" />
        <Button className="button-newsletter">
          <SendIcon />
        </Button>
      </Grid>
    </Grid>
  );
};

export default Newsletter;
