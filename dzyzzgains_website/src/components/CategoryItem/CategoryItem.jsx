import "./category-item.styles.css";

const CategoryItem = ({ item }) => {
  return (
    <div className="container-category-item">
      <image className="image-container" src={item.img} />
      <div classname="info-container">
        <h1 className="title-container">{item.name}</h1>
      </div>
    </div>
  );
};

export default CategoryItem;
