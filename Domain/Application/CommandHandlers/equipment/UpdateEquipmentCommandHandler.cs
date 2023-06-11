using Application.Commands;
using Application.Commands.clothes;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.equipment
{
    public class UpdateEquipmentCommandHandler : IRequestHandler<UpdateEquipmentCommand, Equipment>
    {
        private readonly IEquipmentRepository _equipmentRepo;

        public UpdateEquipmentCommandHandler(IEquipmentRepository equipmentRepo)
        {
            _equipmentRepo = equipmentRepo;
        }

        public async Task<Equipment> Handle(UpdateEquipmentCommand request, CancellationToken cancellationToken)
        {
            var product = await _equipmentRepo.GetEquipment(request.Id);

            product.Id = request.Id;
            product.Name = request.Name;
            product.Description = request.Description;
            product.Brand = request.Brand;
            product.Price = request.Price;
            product.TypeOfEquipment = request.TypeOfEquipment;
            product.Img = request.Img;
            product.InStock = request.InStock;

            var result = _equipmentRepo.UpdateEquipment(product);
            await _equipmentRepo.SaveChangesAsync();
            return result;
        }
    }
}
