using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{

    public class Product
    {
        public Product(string name, ProductCategory category ,string description, string brand, float price, string img)
        {
            Name = name;
            Description = description;
            Brand = brand;
            Price = price;
            Category = category;
            Img = img;

            if (string.IsNullOrEmpty(description))
                throw new ArgumentNullException("Null_description");

            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("Null_name");

            if (string.IsNullOrEmpty(brand))
                throw new ArgumentNullException("Null_company");

            if (price <= 0)
                throw new ArgumentOutOfRangeException("Wrong_PriceRange");
        }

        public Product()
        {

        }
        public Guid Id { get; set; } = Guid.NewGuid();

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }
        public string Img { get; set; }

        public ProductCategory Category { get; set; }

        public ICollection<OrderProducts> Orders { get; set; } = new List<OrderProducts>();

        public enum ProductCategory
        {
            Supplements = 1,
            Equipment = 2,
            Clothes = 3,
        }


    }


}
