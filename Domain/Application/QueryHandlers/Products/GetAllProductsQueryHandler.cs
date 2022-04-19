using Application.Queries;
using Application.Repositories;
using Domain.Customers;
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
    public class GetAllProductsQueryHandler : IRequestHandler<GetAllProductsQuery, IEnumerable<Product>>
    {

        private readonly IProductRepository _productRepo;

        public GetAllProductsQueryHandler(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<IEnumerable<Product>> Handle(GetAllProductsQuery request, CancellationToken cancellationToken)
        {

            var result = await _productRepo.GetAllProducts();
            return await Task.FromResult(result);
        }
    }
}
