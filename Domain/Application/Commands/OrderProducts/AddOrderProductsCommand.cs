using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.OrderProducts
{
    public class AddOrderProductsCommand : IRequest<Guid>
    {
        public Order Order { get; set; }
        public Product Product { get; set; }
    }
}
