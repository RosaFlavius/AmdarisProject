using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.OrderProduct
{
    public class AddOrderProductsCommand : IRequest<Guid>
    {
        public Order Order { get; set; }
        public Product Product { get; set; }

        public Guid ProductId { get; set; }
        public Guid OrderId { get; set; }

    }
}
