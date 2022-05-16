using Application.Commands;
using Application.Repositories;
using Domain.RepositoryPattern;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers
{
    public class UpdateUserCommandHandler : IRequestHandler<UpdateUserCommand, User>
    {
        private readonly IUserRepository _userRepo;

        public UpdateUserCommandHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<User> Handle(UpdateUserCommand request, CancellationToken cancellationToken)
        {
            var user = await _userRepo.GetUser(request.Id);
            user.Id = request.Id;
            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Password = request.Password;
            user.County = request.County;
            user.City = request.City;
            user.Address = request.Address;
            user.Admin = user.Admin;

            User result = _userRepo.UpdateUser(user);
            await _userRepo.SaveChangesAsync();
            return await Task.FromResult(result);
        }
    }
}
