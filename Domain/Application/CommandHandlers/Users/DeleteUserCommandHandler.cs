using Application.Commands;
using Application.Repositories;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers
{
    public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
    {
        private readonly IUserRepository _userRepo;

        public DeleteUserCommandHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(request.Id);
            bool result = _userRepo.DeleteUser(request.Id);
            await _userRepo.SaveChangesAsync(); 
            return await Task.FromResult(result);
        }
    }
}
