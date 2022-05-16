using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries
{
    public class GetEquipmentQuery : IRequest<Equipment>
    {
        public Guid Id { get; set; }
    }
}
