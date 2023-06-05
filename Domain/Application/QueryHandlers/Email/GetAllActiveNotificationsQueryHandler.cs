using Application.Queries.Email;
using Domain.Mail;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers.Email
{
    public class GetAllActiveNotificationsQueryHandler : IRequestHandler<GetAllActiveNotificationsQuery, IEnumerable<NotificationRequest>>
    {
        public readonly INotificationRepository _notificationRepository;

        public GetAllActiveNotificationsQueryHandler(INotificationRepository notificationRepository)
        {
            _notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<NotificationRequest>> Handle(GetAllActiveNotificationsQuery request, CancellationToken cancellationToken)
        {
            return await Task.FromResult(await _notificationRepository.GetAllActiveNotificationsForProduct(request.ProductId));
        }
    }
}
