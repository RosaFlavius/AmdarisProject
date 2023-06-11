using Application.DTOs;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Commands.Email
{
    public class SentNotificationEmailCommand : IRequest<BrevoEmailResponseDTO>
    {
        public Guid ProductId { get; set; }
    }
}
