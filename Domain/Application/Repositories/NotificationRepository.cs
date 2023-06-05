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
    }
}
