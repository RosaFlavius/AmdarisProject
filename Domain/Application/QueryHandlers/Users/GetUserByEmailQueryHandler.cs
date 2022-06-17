using Application.Queries.Users;
using Domain.RepositoryPattern;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers.Users
{
    public class GetUserByEmailQueryHandler :IRequestHandler<GetUserByEmailQuery, User>
    {
        private readonly IUserRepository _userRepo;

        public GetUserByEmailQueryHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<User> Handle(GetUserByEmailQuery request, CancellationToken cancellationToken)
        {
            var result = await _userRepo.GetUserByEmail(request.Email);
            return await Task.FromResult(result);
        }
    }
}
