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
    public class GetProductQueryHandler : IRequestHandler<GetProductQuery, Product>
    {

        private readonly IProductRepository _productRepo;

        public GetProductQueryHandler(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }
            
        public async Task<Product> Handle(GetProductQuery request, CancellationToken cancellationToken)
        {

            var result = await _productRepo.GetProduct(request.Id);
            return await Task.FromResult(result);
        }
    }
}
