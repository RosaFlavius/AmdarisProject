using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Products.Clothes;
using static Domain.Products.Product;

namespace Application.Commands.clothes
{
    public class UpdateClothesCommand : IRequest<Clothes>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public ClothesSize Size { get; set; }
        public ClothesGender Gender { get; set; }
        public string Img { get; set; }
    }
}
