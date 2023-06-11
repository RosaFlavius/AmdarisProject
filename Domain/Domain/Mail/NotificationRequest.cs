using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Mail
{
    public class NotificationRequest
    {
        public Guid NotificationId { get; set; }
        public Guid ProductId { get; set; }
        public Guid UserId { get; set; }
        public string UserEmail { get; set; }
        public bool IsUserNotified { get; set; }
        
    }
}
