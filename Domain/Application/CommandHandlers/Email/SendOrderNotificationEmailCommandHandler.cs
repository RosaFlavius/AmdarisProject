using Application.Abstract;
using Application.Commands.Email;
using Application.DTOs;
using Application.Repositories;
using Domain.DTOs;
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
    public class SendOrderNotificationEmailCommandHandler : IRequestHandler<SendOrderNotificationEmailCommand, BrevoEmailResponseDTO>
    {
        private readonly IUserRepository _userRepository;
        private readonly IOrderNotificationsRepository _orderNotifications;
        private readonly IOrderRepository _orderRepository;
        private readonly IEmailService _emailService;

        public SendOrderNotificationEmailCommandHandler(IEmailService emailService, IUserRepository userRepository, IOrderNotificationsRepository orderNotifications, IOrderRepository orderRepository)
        {
            _userRepository = userRepository;
            _orderNotifications = orderNotifications;
            _orderRepository = orderRepository;
            _emailService = emailService;
        }

        public async Task<BrevoEmailResponseDTO> Handle(SendOrderNotificationEmailCommand request, CancellationToken cancellationToken)
        {
            var notification = await _orderNotifications.GetOrderNotificationByOrderId(request.OrderId);
            var products = await _orderRepository.GetAllProductsByOrderId(notification.OrderId);
            var order = await _orderRepository.GetOrder(notification.OrderId);
            var user = await _userRepository.GetUser(notification.UserId);
            List<EmailOrderDTO.Receiver> userNotified = new()
            {
                new EmailOrderDTO.Receiver
                {
                    Email = user.Email,
                    Name = user.FirstName + " " + user.LastName
                }
            };

            var email = GetEmailContent(notification.OrderId, products.Products, userNotified, user, order);
            var response = await _emailService.SendOrderConfirmation(email);

            return response;

        }
        private EmailOrderDTO GetEmailContent(Guid orderId, List<ProductWithQuantityDTO> products, List<EmailOrderDTO.Receiver> mail, User user, Order order)
        {
            EmailOrderDTO email = new EmailOrderDTO
            {
                Subject = "Your desired product is back in stock!",
                Sender = new EmailOrderDTO.From
                {
                    Email = "no-reply@dzyzzgains.com",
                    Name = "DZyzzGains",
                },
                To = mail,
                HtmlContent = GetEmailHtmlTemplate(orderId, products, mail, user, order)
            };
            return email;
        }

        private string GetEmailHtmlTemplate(Guid orderId, List<ProductWithQuantityDTO> products, List<EmailOrderDTO.Receiver> mail, User user, Order order)
        {
            StringBuilder tableRows = new StringBuilder();
            foreach (var product in products)
            {
                tableRows.AppendLine("<tr>");
                tableRows.AppendLine($"<td>{product.Name}</td>");
                tableRows.AppendLine($"<td>{product.Brand}</td>");
                tableRows.AppendLine($"<td>{product.Quantity}</td>");
                tableRows.AppendLine($"<td>{product.Price}</td>");
                tableRows.AppendLine($"<td>${product.Price * product.Quantity}</td>");
                tableRows.AppendLine("</tr>");
            }

            var content = @"
                    <!DOCTYPE html>
            <html>
            <head>
                <meta charset=""UTF-8"">
                <title>Email Confirmation Order</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        line-height: 1.5;
                        margin: 0;
                        padding: 20px;
                    }
        
                    h1 {
                        color: #333333;
                        font-size: 24px;
                        margin-bottom: 20px;
                    }
        
                    p {
                        margin-bottom: 10px;
                    }
        
                    table {
                        border-collapse: collapse;
                        width: 100%;
                    }
        
                    th, td {
                        border: 1px solid #dddddd;
                        padding: 8px;
                        text-align: left;
                    }
        
                    th {
                        background-color: #f5f5f5;
                    }
        
                    .total {
                        font-weight: bold;
                    }
                     img{
                    width:250px;
                    height:185px;
                }
                .header-container{
                    display: flex;
                    justify-content:space-between;
                    align-items:center;
                    margin-bottom:10px;
                }
                </style>
            ";
            content += $@"
                </head>
                <body>
                    <div class=""header-container"">
                    <div>
                    <h1>Email Confirmation Order</h1>
                    <p>Dear customer</p>
                    <p>Thank you for your order!</p>
                    <p>The details of order <b>{orderId}</b> are as follows:</p>
                    <p>Date:{DateTime.Now}</p>
                    <p>Country:{user.Country}</p>
                    <p>City:{user.City}</p>
                    <p>Shipping Address: {user.Address}</p>
                    </div>
                     <img src=""https://a.allegroimg.com/original/11dcc4/3b5a658646f4ae3ec692eea79a72/Zyzz-naklejka-veni-vidi-vici""/>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Brand</th>
                                <th>Quantity</th>
                                <th>Product Price</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td class=""total"" colspan=""4"">Total:</td>
                                <td class=""total"">${order.TotalPrice}</td>
                            </tr>
                        </tfoot>
                    </table>
                    <p>Best regards,</p>
                    <p>DZyzzGains</p>
                </body>
                </html>
                ";
            return content;
        }
    }
}
