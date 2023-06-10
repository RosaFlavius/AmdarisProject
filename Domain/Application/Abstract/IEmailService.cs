using Application.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Abstract
{
    public interface IEmailService
    {
        public Task<BrevoEmailResponseDTO> SendInStockNotification(EmailDTO emailToSent);
        public Task<BrevoEmailResponseDTO> SendOrderConfirmation(EmailOrderDTO emailToSent);
    }
}
