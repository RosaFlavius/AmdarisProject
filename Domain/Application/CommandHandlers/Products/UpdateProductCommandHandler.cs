using Application.Commands;
using Application.Repositories;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers
{
    public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Product>
    {
        private readonly IProductRepository _productRepo;

        public UpdateProductCommandHandler(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<Product> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _productRepo.GetProduct(request.Id);

            product.Name = request.Name;
            product.Description = request.Description;
            product.Brand = request.Brand;
            product.Price = request.Price;
            product.Category = request.Category;
            product.Id = request.Id;
            product.Img = request.Img;

            Product result = _productRepo.UpdateProduct(product);
            await _productRepo.SaveChangesAsync();
            return await Task.FromResult(result);
        }
    }
}
