using Application.Commands.clothes;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.clothes
{
    public class AddClothesCommandHandler : IRequestHandler<AddClothesCommand, Clothes>
    {
        private readonly IClothesRepository _clothesRepo;

        public AddClothesCommandHandler(IClothesRepository clothesRepo)
        {
            _clothesRepo = clothesRepo;
        }

        public async Task<Clothes> Handle(AddClothesCommand request, CancellationToken cancellationToken)
        {
            var product = new Clothes
            {
                Name = request.Name,
                Description = request.Description,
                Brand = request.Brand,
                Price = request.Price,
                Gender = request.Gender,
                Size = request.Size,
                Img = request.Img,
            };

            _clothesRepo.AddClothes(product);
            await _clothesRepo.SaveChangesAsync();
            return product;
        }
    }
}
