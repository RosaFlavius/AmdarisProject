using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{

    public class Product
    {
        public Product(string name, string description, string company, float price)
        {
            Id = Guid.NewGuid();
            Name = name;
            Description = description;
            Company = company;
            Price = price;

            if (string.IsNullOrEmpty(description))
                throw new ArgumentNullException("Null_description");

            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("Null_name");

            if (string.IsNullOrEmpty(company))
                throw new ArgumentNullException("Null_company");

            if (price <= 0)
                throw new ArgumentOutOfRangeException("Wrong_PriceRange");
        }

        public Guid Id { get; }

        public string Name { get; }

        public string Company { get; }

        public string Description { get; }

        public float Price { get; }



    }
}
