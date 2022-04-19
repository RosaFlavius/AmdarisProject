using Application.Commands;
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

namespace Application.CommandHandlers
{
    public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, bool>
    {
        private readonly IProductRepository _productRepo;

        public DeleteProductCommandHandler(IProductRepository productRepo)
        {
            _productRepo = productRepo;
        }

        public async Task<bool> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
        {
            var product = await _productRepo.GetProduct(request.Id);

            bool result = _productRepo.DeleteProduct(request.Id);
            await _productRepo.SaveChangesAsync();
            return result;
        }
    }
}
