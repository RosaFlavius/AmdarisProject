using Application.Commands.Email;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Email
{
    public class DeleteNotificationCommandHandler : IRequestHandler<DeleteNotificationCommand, bool>
    {
        private readonly INotificationRepository _notificationRepository;

        public DeleteNotificationCommandHandler(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<bool> Handle(DeleteNotificationCommand request, CancellationToken cancellationToken)
        { 
            bool result = await _notificationRepository.DeleteNotification(request.UserId, request.ProductId);
            return result;
        }
    }
}
