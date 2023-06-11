using Domain.Mail;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class OrderNotificationsRepository : IOrderNotificationsRepository
    {
        private readonly DataDbContext _dbContext;
        public OrderNotificationsRepository(DataDbContext dataDbContext)
        {
            _dbContext = dataDbContext;
        }

        public async Task<NotificationOrder> CreateOrderNotification(NotificationOrder notification)
        {
            _dbContext.Add(notification);
            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<NotificationOrder> GetOrderNotificationByOrderId(Guid orderId)
        {
            return await _dbContext.OrdersNotifications.FirstOrDefaultAsync(order => order.OrderId == orderId);
        }

        public async Task<NotificationOrder> GetOrderNotification(Guid notificationId)
        {
            return await _dbContext.OrdersNotifications.FirstOrDefaultAsync(not => not.NotificationId == notificationId);
        }
    }
}
