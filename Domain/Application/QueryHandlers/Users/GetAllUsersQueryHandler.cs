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
    public class GetAllUsersQueryHandler : IRequestHandler<GetAllUsersQuery, IEnumerable<User>>
    {

        private readonly IUserRepository _userRepo;

        public GetAllUsersQueryHandler(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<IEnumerable<User>> Handle(GetAllUsersQuery request, CancellationToken cancellationToken)
        {

            var result = await _userRepo.GetAllUsers();
            return await Task.FromResult(result);
        }
    }
}
