using Domain.Customers;
using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries
{
    public class GetProductQuery : IRequest<Product>
    {
        public Guid Id { get; set; }
    }
}
