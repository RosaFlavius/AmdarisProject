using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries
{
    public class GetUserQuery : IRequest<User>
    {
        public Guid Id { get; set; }
    }
}
