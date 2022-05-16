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
    public class DeleteClothesCommandHandler : IRequestHandler<DeleteClothesCommand, bool>
    {
        private readonly IClothesRepository _clothesRepo;

        public DeleteClothesCommandHandler(IClothesRepository clothesRepo)
        {
            _clothesRepo = clothesRepo;
        }

        public async Task<bool> Handle(DeleteClothesCommand request, CancellationToken cancellationToken)
        {
            var product = await _clothesRepo.GetClothes(request.Id);

            bool result = _clothesRepo.DeleteClothes(request.Id);
            await _clothesRepo.SaveChangesAsync();
            return result;
        }
    }
}
