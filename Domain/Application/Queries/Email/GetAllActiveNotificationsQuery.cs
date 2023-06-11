using Domain.Mail;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.Email
{
    public class GetAllActiveNotificationsQuery : IRequest<IEnumerable<NotificationRequest>>
    {
        public Guid ProductId { get; set; }
    }
}
