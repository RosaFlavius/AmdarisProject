using Application.Queries;
using Application.Repositories;
using Domain.RepositoryPattern;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers
{
    public class GetUserQueryHandler : IRequestHandler<GetUserQuery, User>
    {

        private readonly IUserRepository _userRepo;

        public GetUserQueryHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }
            
        public async Task<User> Handle(GetUserQuery request, CancellationToken cancellationToken)
        {
            var customer = new User
            {
                Id = Guid.NewGuid(),
            };

            var result = await _userRepo.GetUser(request.Id);
            return await Task.FromResult(result);
        }
    }
}
