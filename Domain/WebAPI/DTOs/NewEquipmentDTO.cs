using static Domain.Products.Equipment;
using static Domain.Products.Product;

namespace WebAPI.DTOs
{
    public class NewEquipmentDTO
    {
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public string Img { get; set; }
        public EquipmentType TypeOfEquipment { get; set; }
        public ProductCategory Category { get => ProductCategory.Equipment; }
    }
}
