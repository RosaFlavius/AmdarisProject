import "./category-item.styles.css";

const CategoryItem = ({ item }) => {
  return (
    <div className="container-category-item">
      <img className="image-container" src={item.img} />
      <div className="info-container">
        <h1 className="title-container">{item.name}</h1>
      </div>
    </div>
  );
};

export default CategoryItem;
