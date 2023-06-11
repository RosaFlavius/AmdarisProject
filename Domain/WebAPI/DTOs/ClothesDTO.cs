using static Domain.Products.Clothes;
using static Domain.Products.Product;

namespace WebAPI.DTOs
{
    public class ClothesDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string Img { get; set; }
        public bool InStock { get; set; }
        public ClothesSize Size { get; set; }
        public ClothesGender Gender { get; set; }
        public ProductCategory Category { get => ProductCategory.Clothes; }
    }
}
