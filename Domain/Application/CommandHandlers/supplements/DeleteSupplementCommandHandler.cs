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

namespace Application.CommandHandlers.supplements
{
    public class DeleteSupplementCommandHandler : IRequestHandler<DeleteSupplementCommand, bool>
    {
        private readonly ISupplementRepository _supplementRepo;

        public DeleteSupplementCommandHandler(ISupplementRepository supplementRepo)
        {
            _supplementRepo = supplementRepo;
        }

        public async Task<bool> Handle(DeleteSupplementCommand request, CancellationToken cancellationToken)
        {
            var product = await _supplementRepo.GetSupplement(request.Id);

            bool result = _supplementRepo.DeleteSupplement(request.Id);
            await _supplementRepo.SaveChangesAsync();
            return result;
        }
    }
}
