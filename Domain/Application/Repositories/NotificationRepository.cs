using Domain.Mail;
using Domain.Products;
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
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataDbContext _dbContext;

        public NotificationRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<NotificationRequest> CreateNotification(NotificationRequest notification)
        {
            _dbContext.Add(notification);
            await _dbContext.SaveChangesAsync();
            return notification;
        }

        public async Task<IEnumerable<NotificationRequest>> GetAllActiveNotificationsForProduct(Guid productId)
        {
            return await _dbContext.Notifications.Where(active => active.IsUserNotified == false && active.ProductId == productId).ToListAsync();
        }

        public async Task<NotificationRequest> GetNotification(Guid notificationId)
        {
            return await _dbContext.Notifications.FirstOrDefaultAsync(not => not.NotificationId == notificationId);
        }

        public async Task<NotificationRequest> UpdateActiveNotification(Guid notificationId)
        {
            var notification = await GetNotification(notificationId);
            if (notification is null)
            {
                return null;
            }
            notification.IsUserNotified = true;
            _dbContext.Notifications.Update(notification);

            await _dbContext.SaveChangesAsync();
            return notification;
        }


    }
}
