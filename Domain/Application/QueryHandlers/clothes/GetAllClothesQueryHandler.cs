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
    public class GetAlClothesQueryHandler : IRequestHandler<GetAllClothesQuery, IEnumerable<Clothes>>
    {

        private readonly IClothesRepository _clothesRepo;

        public GetAlClothesQueryHandler(IClothesRepository clothesRepo)
        {
            _clothesRepo = clothesRepo;
        }

        public async Task<IEnumerable<Clothes>> Handle(GetAllClothesQuery request, CancellationToken cancellationToken)
        {

            var result = await _clothesRepo.GetAllClothes();
            return await Task.FromResult(result);
        }
    }
}
