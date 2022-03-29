using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public class Category
    {
        public Category(string name, List<Product> products)
        {
            Id = Guid.NewGuid();
            Name = name;
            Products = products;

            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("Null_name");


        }

        public Guid Id { get; }
        public string Name { get; set; }

        public List<Product> Products { get; set; }

        public override string ToString()
        {
            return this.Id + ", name = " + this.Name;
        }
    }
}
