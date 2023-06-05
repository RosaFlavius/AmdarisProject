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
    public class AddUserCommandHandler : IRequestHandler<AddUserCommand, User>
    {
        private readonly IUserRepository _userRepo;
        public AddUserCommandHandler(IUserRepository userRepo) 
        {
            _userRepo = userRepo;
        }
        public async Task<User> Handle(AddUserCommand request, CancellationToken cancellationToken)
        {
            var user = new User
            {
                FirstName = request.FirstName,  
                LastName = request.LastName,
                Email = request.Email,
                Password = request.Password,
                DateOfBirth = request.DateOfBirth,
                Phone = request.Phone,
                Country = request.Country,
                City = request.City,
                Address = request.Address,
                Admin = request.Admin,
                UserId = Guid.NewGuid(),
            };

            _userRepo.AddUser(user);
            await _userRepo.SaveChangesAsync();
            return user;
        }
    }
}
