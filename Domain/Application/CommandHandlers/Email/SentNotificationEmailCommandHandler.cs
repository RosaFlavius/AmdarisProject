using Application.Abstract;
using Application.Commands.Email;
using Application.DTOs;
using Domain.Mail;
using Domain.Products;
using Domain.RepositoryPattern;
using Domain.Users;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Email
{
    public class SentNotificationEmailCommandHandler : IRequestHandler<SentNotificationEmailCommand, BrevoEmailResponseDTO>
    {
        private readonly IEmailService _emailService;
        private readonly INotificationRepository _notificationRepository;
        private readonly IProductRepository _productRepository;
        private readonly IUserRepository _userRepository;
        public SentNotificationEmailCommandHandler(IEmailService emailService, INotificationRepository notificationRepository, IProductRepository productRepository, IUserRepository userRepository)
        {
            _emailService = emailService;
            _notificationRepository = notificationRepository;
            _productRepository = productRepository;
            _userRepository = userRepository;
        }

        public async Task<BrevoEmailResponseDTO> Handle(SentNotificationEmailCommand request, CancellationToken cancellationToken)
        {
            var activeNotifications = await _notificationRepository.GetAllActiveNotificationsForProduct(request.ProductId);
            var product = await _productRepository.GetProduct(request.ProductId);
            var users = await _userRepository.GetAllUsers();
            List<EmailDTO.Receiver> usersToBeNotified = new();
            foreach (var i in activeNotifications)
            {
                var user = users.FirstOrDefault(usr => usr.UserId == i.UserId);
                if (user != null)
                {
                    usersToBeNotified.Add(new EmailDTO.Receiver
                    {
                        Email = user.Email,
                        Name = user.FirstName + " " + user.LastName
                    });
                }
            }
            var email = GetEmailContent(product, usersToBeNotified);
            var response = await _emailService.SendInStockNotification(email);

            return response;
        }

        private EmailDTO GetEmailContent(Product product, List<EmailDTO.Receiver> emails)
        {
            EmailDTO email = new EmailDTO
            {
                Subject = "Your desired product is back in stock!",
                Sender = new EmailDTO.From
                {
                    Email = "no-reply@dzyzzgains.com",
                    Name = "DZyzzGains",
                },
                To = emails,
                HtmlContent = GetEmailHtmlTemplate(product)
            };
            return email;
        }

        private string GetEmailHtmlTemplate(Product product)
        {
            var content = @"
                    <!DOCTYPE html>
                <html>
                <head>
                  <title>Product Back in Stock</title>
                  <style>
                    body {
                      font-family: Arial, sans-serif;
                      background-color: #f5f5f5;
                      padding: 20px;
                    }
                    .container {
                      max-width: 600px;
                      margin: 0 auto;
                      background-color: #ffffff;
                      border-radius: 5px;
                      padding: 30px;
                      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                    }
                    h1 {
                      color: #333333;
                      font-size: 24px;
                      margin-top: 0;
                    }
                    p {
                      color: #666666;
                      font-size: 16px;
                      margin-bottom: 20px;
                    }
                    .button {
                      display: inline-block;
                      background-color: #4CAF50;
                      color: #ffffff;
                      text-decoration: none;
                      padding: 10px 20px;
                      border-radius: 4px;
                    }
                    .button:hover {
                      background-color: #45a049;
                    }
                    img{
                        width:250px;
                        height:185px;
                    }
                    .footer{
                        display: flex;
                        justify-content:space-between;
                        align-items:flex-end;
                    }
                  </style>
";
            content+= $@"
                </head>
                <body>
                  <div class=""container"">
                    <h1>Product: {product.Name} is back in stock!</h1>
                    <p>Dear customer,</p>
                    <p>We are pleased to inform you that the product you have been waiting for is now back in stock!</p>
                    <p>Hurry up and place your order now before it runs out again.</p>
                    <p>Click the button below to visit our website and make your purchase:</p>
                    <p><a href=""http://localhost:3000/products"" class=""button"">Order Now</a></p>

                    <div class=""footer"">
                        <div>
                            <p>Thank you for choosing our services.</p>
                            <p>Best regards,<br> DZyzzGains shop</p>
                        </div>
                     <img src=""https://a.allegroimg.com/original/11dcc4/3b5a658646f4ae3ec692eea79a72/Zyzz-naklejka-veni-vidi-vici""/>
                    </div>
                  </div>
                </body>
                </html>
                ";
            return content;
        }
    }
}
