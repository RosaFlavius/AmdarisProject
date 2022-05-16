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
    public class GetSupplementQueryHandler : IRequestHandler<GetSupplementQuery, Supplement>
    {

        private readonly ISupplementRepository _supplementRepo;

        public GetSupplementQueryHandler(ISupplementRepository supplementRepo)
        {
            _supplementRepo = supplementRepo;
        }

        public async Task<Supplement> Handle(GetSupplementQuery request, CancellationToken cancellationToken)
        {

            var result = await _supplementRepo.GetSupplement(request.Id);
            return await Task.FromResult(result);
        }
    }
}
