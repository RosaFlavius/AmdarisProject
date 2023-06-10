using Application.Commands.Email;
using Application.Repositories;
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
    public class CreateOrderNotificationCommandHandler : IRequestHandler<CreateOrderNotificationCommand, NotificationOrder>
    {
        public readonly IOrderNotificationsRepository _orderNotifications;
        public CreateOrderNotificationCommandHandler(IOrderNotificationsRepository orderNotifications)
        {
            _orderNotifications = orderNotifications;
        }
        public async Task<NotificationOrder> Handle(CreateOrderNotificationCommand request, CancellationToken cancellationToken)
        {
            var notification = new NotificationOrder
            {
                OrderId = request.OrderId,
                UserEmail = request.UserEmail,
                UserId = request.UserId,
            };
            await _orderNotifications.CreateOrderNotification(notification);
            return notification;
        }
    }
}
