using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Products.Product;
using static Domain.Products.Supplement;

namespace Application.Commands
{
    public class UpdateSupplementCommand : IRequest<Supplement>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public SupplementType TypeOfSupplement { get; set; }
        public string Img { get; set; }

    }
}
