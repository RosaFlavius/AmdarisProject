﻿using Application.Commands.OrderProduct;
using Application.Commands.Orders;
using Application.DTOs;
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
        public async Task<IActionResult> AddOrder([FromBody] AddOrderCommand command)
        {
            var res = await _mediator.Send(command);
            return Ok(res);
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

        [HttpPut("{orderId}")]
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
        public async Task<IActionResult> AddProductsToOrder([FromBody] AddOrderProductsCommand command)
        {
         
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpGet("api/products/{orderId}")]
        public async Task<IActionResult> GetAllProductsByOrderId(Guid orderId)
        {
            var query = new GetAllProductsByOrderIdQuery
            {
                OrderId = orderId,
            };

            var result = await _mediator.Send(query);
            return Ok(result);
        }
    }
}
