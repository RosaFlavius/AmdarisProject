using Application.Commands.Email;
using Application.Queries.Email;
using Application.Queries.Orders;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderNotificationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public OrderNotificationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("{userEmail}")]
        public async Task<IActionResult> CreateOrderNotification(string userEmail, [FromBody] CreateOrderNotificationDTO dto)
        {
            var command = new CreateOrderNotificationCommand
            {
                OrderId = dto.OrderId,
                UserEmail = userEmail,
                UserId = dto.UserId,
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpGet("{orderId}")]
        public async Task<IActionResult> GetAllProductsByOrderId(Guid orderId)
        {
            var query = new GetAllProductsByOrderIdQuery { OrderId = orderId };

            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost("send/{orderId}")]
        public async Task<IActionResult> SendOrderEmailNotification(Guid orderId)
        {
            var command = new SendOrderNotificationEmailCommand
            {
                OrderId = orderId,
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }
    }


}
