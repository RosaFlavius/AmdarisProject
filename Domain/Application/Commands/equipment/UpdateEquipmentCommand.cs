using Domain.Products;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Products.Equipment;
using static Domain.Products.Product;

namespace Application.Commands
{
    public class UpdateEquipmentCommand : IRequest<Equipment>
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Brand { get; set; }
        public string Description { get; set; }
        public float Price { get; set; }
        public EquipmentType TypeOfEquipment { get; set; }

        public string Img { get; set; }


    }
}
