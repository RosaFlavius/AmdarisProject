using Application.Commands.OrderProduct;
using Application.Commands.Orders;
using Application.Queries.Orders;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public OrderController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetOrder(Guid id)
        {
            var query = new GetOrderQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<OrderDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var query = new GetAllOrdersQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<OrderDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct(OrderDTO order)
        {
            var commandOrder = new AddOrderCommand
            {
                TotalPrice = order.TotalPrice,
            };

            await _mediator.Send(commandOrder);

            return Ok(order);
        }

        [HttpDelete("{orderId}")]
        public async Task<IActionResult> DeleteOrder(Guid orderId)
        {

            var command = new DeleteOrderCommand
            {
                Id = orderId
            };

            await _mediator.Send(command);
            return Ok(orderId);
        }

        [HttpPatch("{orderId}")]
        public async Task<IActionResult> UpdateOrder(OrderDTO order, Guid orderId)
        {

            var command = new UpdateOrderCommand
            {
                Id = orderId,
                TotalPrice = order.TotalPrice,

            };
            await _mediator.Send(command);

            return Ok(orderId);
        }

        [HttpPatch]
        public async Task<IActionResult> AddProductsToOrder(Guid orderId, Guid productId)
        {
            var commandOrderProducts = new AddOrderProductsCommand
            {
                OrderId = orderId,
                ProductId = productId,
            };

            await _mediator.Send(commandOrderProducts);

            return Ok();
        }
    }
}
