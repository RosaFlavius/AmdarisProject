using Domain.Mail;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Email
{
    public class CreateNotificationCommand : IRequest<NotificationRequest>
    {
        public Guid ProductId { get; set; }
        public string UserEmail { get; set; }
        public Guid UserId { get; set; }
    }
}
