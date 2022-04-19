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
            Products = new List<OrderProducts>();
        }




        public Guid Id { get; set; }
        //public List<Product> Products { get; set; }

        public ICollection<OrderProducts> Products { get; set; }

        public double TotalPrice { get; set; }



     
    }

    
    
}
