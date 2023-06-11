using static Domain.Products.Product;

namespace WebAPI.DTOs
{
    public class ProductDTO
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string Img { get; set; }
        public bool InStock { get; set; }
        public ProductCategory Categories { get; set; }
    }
}
