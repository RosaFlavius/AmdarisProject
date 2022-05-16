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
    public class GetClothesQueryHandler : IRequestHandler<GetClothesQuery, Clothes>
    {

        private readonly IClothesRepository _clothesRepo;

        public GetClothesQueryHandler(IClothesRepository clothesRepo)
        {
            _clothesRepo = clothesRepo;
        }

        public async Task<Clothes> Handle(GetClothesQuery request, CancellationToken cancellationToken)
        {

            var result = await _clothesRepo.GetClothes(request.Id);
            return await Task.FromResult(result);
        }
    }
}
