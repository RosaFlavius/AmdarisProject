using Application.Commands.clothes;
using Application.Commands.Email;
using Application.Queries;
using Application.Queries.Email;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly IMediator _mediator;

        public NotificationController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpPost("notification/{userEmail}")]
        public async Task<IActionResult> CreateNotification( Guid productId, string userEmail, Guid userId)
        {
            var command = new CreateNotificationCommand
            {
                ProductId = productId,
                UserEmail = userEmail,
                UserId = userId,
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpGet("activeNotification/{productId}")]
        public async Task<IActionResult> GetAllActiveNotifications(Guid productId)
        {
            var query = new GetAllActiveNotificationsQuery { ProductId = productId };

            var result = await _mediator.Send(query);
            return Ok(result);
        }

        [HttpPost("notification/sent/{productId}")]
        public async Task<IActionResult> SentEmailNotification(Guid productId)
        {
            var command = new SentNotificationEmailCommand
            {
                ProductId = productId,
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }
    }
}
