using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Products
{
    public class UpdateInStockProductCommand : IRequest<Product>
    {
        public Guid Id { get; set; }
    }
}
