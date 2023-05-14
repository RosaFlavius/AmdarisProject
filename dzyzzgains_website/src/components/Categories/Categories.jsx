import { categories } from "../../data";
import CategoryItem from "../CategoryItem/CategoryItem.jsx";
import "./categories.styles.css";
import { Grid } from "@mui/material";

const Categories = () => {
  return (
    <Grid container spacing={3} className="container-categories">
      {categories.map((item) => (
        <Grid item xs={12} sm={6} md={4} lg={4} key={item.id}>
          <CategoryItem item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Categories;
