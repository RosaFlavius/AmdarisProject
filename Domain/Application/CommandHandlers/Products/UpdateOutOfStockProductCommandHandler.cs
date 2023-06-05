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
    public class UpdateOutOfStockProductCommandHandler : IRequestHandler<UpdateOutOfStockProductCommand, Product>
    {
        private readonly IProductRepository _productRepository;

        public UpdateOutOfStockProductCommandHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<Product> Handle(UpdateOutOfStockProductCommand request, CancellationToken cancellationToken)
        {
            var res = await _productRepository.UpdateOutOfStockProduct(request.Id);
            return res;
        }
    }

}
