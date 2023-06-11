using Application.Commands.Email;
using Domain.Mail;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Email
{
    public class CreateNotificationCommandHandler :IRequestHandler<CreateNotificationCommand, NotificationRequest>
    {
        public readonly INotificationRepository _notificationRepository;
        public CreateNotificationCommandHandler(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }
        public async Task<NotificationRequest> Handle(CreateNotificationCommand request, CancellationToken cancellationToken)
        {
            var notification = new NotificationRequest
            {
                ProductId = request.ProductId,
                UserEmail = request.UserEmail,
                UserId = request.UserId,
                IsUserNotified = false,
            };
            await _notificationRepository.CreateNotification(notification);
            return notification;
        }
    }
}
