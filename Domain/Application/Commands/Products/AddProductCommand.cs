using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Products.Product;

namespace Application.Commands
{
    public class AddProductCommand : IRequest<Product>
    {
        public AddProductCommand()
        {
        }

        public string Name { get; set; }

        public string Brand { get; set; }

        public string Description { get; set; }

        public float Price { get; set; }

        public string Img { get; set; }

        public bool InStock { get; set; }

        public ProductCategory Category { get; set; }


    }
}
