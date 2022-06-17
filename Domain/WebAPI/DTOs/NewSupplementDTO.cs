using static Domain.Products.Product;
using static Domain.Products.Supplement;

namespace WebAPI.DTOs
{
    public class NewSupplementDTO
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string Img { get; set; }
        public SupplementType TypeOfSupplement { get; set; }
        public ProductCategory Category { get => ProductCategory.Supplements; }
    }
}
