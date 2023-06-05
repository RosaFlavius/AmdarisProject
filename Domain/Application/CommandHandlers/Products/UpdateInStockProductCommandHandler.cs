using Application.Commands.Products;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Products
{
    public class UpdateInStockProductCommandHandler : IRequestHandler<UpdateInStockProductCommand, Product>
    {
        private readonly IProductRepository _productRepository;

        public UpdateInStockProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }
        public async Task<Product> Handle(UpdateInStockProductCommand request, CancellationToken cancellationToken)
        {
            var res = await _productRepository.UpdateInStockProduct(request.Id);

            return res;
        }
    }
}
