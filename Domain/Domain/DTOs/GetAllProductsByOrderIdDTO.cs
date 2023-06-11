using Domain.DTOs;
using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.DTOs
{
    public class GetAllProductsByOrderIdDTO
    {
        public Order Order { get; set; }
        public List<ProductWithQuantityDTO> Products { get; set; }
    }
}
