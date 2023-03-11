import { categories } from "../../data";
import CategoryItem from "../CategoryItem.jsx";
import "./categories.styles.css";

const Categories = () => {
  return (
    <div className="container-categories">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </div>
  );
};

export default Categories;
