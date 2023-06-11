using Application.Commands.Email;
using Application.Queries.Email;
using Application.Queries.Orders;
using MediatR;
using Microsoft.AspNetCore.Mvc;

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

        [HttpPost("orderNotification/{userEmail}")]
        public async Task<IActionResult> CreateOrderNotification(Guid orderId, string userEmail, Guid userId)
        {
            var command = new CreateOrderNotificationCommand
            {
                OrderId = orderId,
                UserEmail = userEmail,
                UserId = userId,
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpGet("orderNotification/{orderId}")]
        public async Task<IActionResult> GetAllProductsByOrderId(Guid orderId)
        {
            var query = new GetAllProductsByOrderIdQuery { OrderId = orderId };

            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost("orderNotification/send/{orderId}")]
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
