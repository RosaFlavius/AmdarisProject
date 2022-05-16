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
    public class AddProductCommandHandler : IRequestHandler<AddProductCommand, Product>
    {
        private readonly IProductRepository _productRepo;
        public AddProductCommandHandler(IProductRepository productRepository) 
        {
            _productRepo = productRepository;
        }
        public async Task<Product> Handle(AddProductCommand request, CancellationToken cancellationToken)
        {
            var product = new Product
            {
                Name = request.Name,
                Description = request.Description,
                Brand = request.Brand,
                Price = request.Price,
                Category = request.Category,
            };

            _productRepo.AddProduct(product);
            await _productRepo.SaveChangesAsync();
            return product;
        }
    }
}
