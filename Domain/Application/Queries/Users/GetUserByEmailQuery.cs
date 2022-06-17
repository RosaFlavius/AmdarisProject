using Domain.Users;
using MediatR;

namespace Application.Queries.Users
{
    public class GetUserByEmailQuery : IRequest<User>
    {
        public string Email { get; set; }
    }
}
