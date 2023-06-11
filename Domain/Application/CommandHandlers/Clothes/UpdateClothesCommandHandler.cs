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
    public class UpdateClothesCommandHandler : IRequestHandler<UpdateClothesCommand, Clothes>
    {
        private readonly IClothesRepository _clothesRepo;

        public UpdateClothesCommandHandler(IClothesRepository clothesRepo)
        {
            _clothesRepo = clothesRepo;
        }

        public async Task<Clothes> Handle(UpdateClothesCommand request, CancellationToken cancellationToken)
        {
            var product = await _clothesRepo.GetClothes(request.Id);

            product.Id = request.Id;
            product.Name = request.Name;
            product.Description = request.Description;
            product.Brand = request.Brand;
            product.Price = request.Price;
            product.Size = request.Size;
            product.Gender = request.Gender;
            product.Img = request.Img;
            product.InStock = request.InStock;


            var result = _clothesRepo.UpdateClothes(product);
            await _clothesRepo.SaveChangesAsync();
            return result;
        }
    }
}
