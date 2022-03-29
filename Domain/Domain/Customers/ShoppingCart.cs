using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Customers
{
    public class ShoppingCart
    {
        public Guid Id { get; }
        public List<Product> Products { get; set; }
        public ShoppingCart()
        {
            Id = Guid.NewGuid();
            Products = new List<Product>();

        }

    }
}
