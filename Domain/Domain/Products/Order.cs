using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{

    public class Order
    {
        public Order()
        {
            Id = Guid.NewGuid();
            Products = new List<Product>();
        }


        public Guid Id { get; set; }
        //public List<Product> Products { get; set; }

        public ICollection<Product> Products { get; init; } = null;

     
    }

    
    
}
