using Domain.Mail;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IOrderNotificationsRepository
    {
        public Task<NotificationOrder> CreateOrderNotification(NotificationOrder notification);
        public Task<NotificationOrder> GetOrderNotificationByOrderId(Guid orderId);
        public Task<NotificationOrder> GetOrderNotification(Guid notificationId);
    }
}
