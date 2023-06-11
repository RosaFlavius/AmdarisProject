using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Mail
{
    public class NotificationOrder
    {
        public Guid NotificationId { get; set; }
        public Guid OrderId { get; set; }
        public Guid UserId { get; set; }
        public string UserEmail { get; set; }
    }
}
