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
    public class AddEquipmentCommandHandler : IRequestHandler<AddEquipmentCommand, Equipment>
    {
        private readonly IEquipmentRepository _equipmentRepo;
        public AddEquipmentCommandHandler(IEquipmentRepository equipmentRepo)
        {
            _equipmentRepo = equipmentRepo;
        }

        public async Task<Equipment> Handle(AddEquipmentCommand request, CancellationToken cancellationToken)
        {
            var product = new Equipment(request.TypeOfEquipment, request.Name, request.Description, request.Brand, request.Price, request.Img, request.InStock);

            _equipmentRepo.AddEquipment(product);
            await _equipmentRepo.SaveChangesAsync();
            return product;
        }
    }
}
