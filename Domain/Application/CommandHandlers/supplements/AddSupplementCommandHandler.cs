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
    public class AddSupplementCommandHandler : IRequestHandler<AddSupplementCommand, Supplement>
    {
        private readonly ISupplementRepository _supplementRepo;

        public AddSupplementCommandHandler(ISupplementRepository supplementRepo)
        {
            _supplementRepo = supplementRepo;
        }

        public async Task<Supplement> Handle(AddSupplementCommand request, CancellationToken cancellationToken)
        {
            var product = new Supplement
            {
                Name = request.Name,
                Description = request.Description,
                Brand = request.Brand,
                Price = request.Price,
                TypeOfSupplement = request.TypeOfSupplement,
                Img = request.Img,
                InStock = request.InStock,
            };

            _supplementRepo.AddSupplement(product);
            await _supplementRepo.SaveChangesAsync();
            return product;
        }
    }
}
