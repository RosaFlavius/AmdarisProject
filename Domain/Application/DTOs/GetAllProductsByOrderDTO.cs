using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class GetAllProductsByOrderDTO
    {
        public Order Order { get; set; }
        public List<Product> Products { get; set; }
    }
}
