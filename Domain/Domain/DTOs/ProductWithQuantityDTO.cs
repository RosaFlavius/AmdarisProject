using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.DTOs
{
    public class ProductWithQuantityDTO
    {

        public string Name { get; set; }
        public string Brand { get; set; }
        public float Price { get; set; }
        public string Address { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public int Quantity { get; set; }
    }
}
