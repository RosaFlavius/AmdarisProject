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
    public class GetAllEquipmentQueryHandler : IRequestHandler<GetAllEquipmentQuery, IEnumerable<Equipment>>
    {

        private readonly IEquipmentRepository _equipmentRepo;

        public GetAllEquipmentQueryHandler(IEquipmentRepository equipmentRepo)
        {
            _equipmentRepo = equipmentRepo;
        }

        public async Task<IEnumerable<Equipment>> Handle(GetAllEquipmentQuery request, CancellationToken cancellationToken)
        {

            var result = await _equipmentRepo.GetAllEquipment();
            return await Task.FromResult(result);
        }
    }
}
