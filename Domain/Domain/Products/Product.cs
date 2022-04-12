using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{

    public class Product
    {
        public Product(string name, Category category ,string description, string brand, float price)
        {
            Id = Guid.NewGuid();
            Name = name;
            Description = description;
            Brand = brand;
            Price = price;
            Categories = category;

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
            Id = Guid.NewGuid();
        }
        public Guid Id { get; set; }

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public Category Categories { get; set; }

        public ICollection<Order> Orders { get; init; } = null;

        public enum Category
        {
            Supplements = 1,
            Equipment = 2,
            Clothes = 3,
        }


    }


}
