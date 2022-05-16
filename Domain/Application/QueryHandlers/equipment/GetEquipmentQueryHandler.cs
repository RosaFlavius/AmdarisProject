using Application.Queries;
using Application.Repositories;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers
{
    public class GetEquipmentQueryHandler : IRequestHandler<GetEquipmentQuery, Equipment>
    {

        private readonly IEquipmentRepository _equipmentRepo;

        public GetEquipmentQueryHandler(IEquipmentRepository equipmentRepo)
        {
            _equipmentRepo = equipmentRepo;
        }

        public async Task<Equipment> Handle(GetEquipmentQuery request, CancellationToken cancellationToken)
        {

            var result = await _equipmentRepo.GetEquipment(request.Id);
            return await Task.FromResult(result);
        }
    }
}
