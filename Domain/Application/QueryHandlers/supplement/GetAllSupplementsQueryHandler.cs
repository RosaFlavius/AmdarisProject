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
    public class GetAllSupplementsQueryHandler : IRequestHandler<GetAllSupplementsQuery, IEnumerable<Supplement>>
    {

        private readonly ISupplementRepository _supplementRepo;

        public GetAllSupplementsQueryHandler(ISupplementRepository supplementRepo)
        {
            _supplementRepo = supplementRepo;
        }

        public async Task<IEnumerable<Supplement>> Handle(GetAllSupplementsQuery request, CancellationToken cancellationToken)
        {

            var result = await _supplementRepo.GetAllSupplements();
            return await Task.FromResult(result);
        }
    }
}
