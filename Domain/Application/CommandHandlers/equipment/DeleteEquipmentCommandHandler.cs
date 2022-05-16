using Application.Commands;
using Application.Repositories;
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
    public class DeleteEquipmentCommandHandler : IRequestHandler<DeleteEquipmentCommand, bool>
    {
        private readonly IEquipmentRepository _equipmentRepo;

        public DeleteEquipmentCommandHandler(IEquipmentRepository equipmentRepo)
        {
            _equipmentRepo = equipmentRepo;
        }

        public async Task<bool> Handle(DeleteEquipmentCommand request, CancellationToken cancellationToken)
        {
            var product = await _equipmentRepo.GetEquipment(request.Id);

            bool result = _equipmentRepo.DeleteEquipment(request.Id);
            await _equipmentRepo.SaveChangesAsync();
            return result;
        }
    }
}
