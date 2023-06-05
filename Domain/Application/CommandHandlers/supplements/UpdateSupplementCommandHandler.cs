using Application.Commands;
using Application.Commands.clothes;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.supplements
{
    public class UpdateSupplementCommandHandler : IRequestHandler<UpdateSupplementCommand, Supplement>
    {
        private readonly ISupplementRepository _supplementRepo;

        public UpdateSupplementCommandHandler(ISupplementRepository supplementRepo)
        {
            _supplementRepo = supplementRepo;
        }

        public async Task<Supplement> Handle(UpdateSupplementCommand request, CancellationToken cancellationToken)
        {
            var product = await _supplementRepo.GetSupplement(request.Id);

            product.Id = request.Id;
            product.Name = request.Name;
            product.Description = request.Description;
            product.Brand = request.Brand;
            product.Price = request.Price;
            product.TypeOfSupplement = request.TypeOfSupplement;
            product.Img = request.Img;
            product.InStock = request.InStock;

            var result = _supplementRepo.UpdateSupplement(product);
            await _supplementRepo.SaveChangesAsync();
            return result;
        }
    }
}
