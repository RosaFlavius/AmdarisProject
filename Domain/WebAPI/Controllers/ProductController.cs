using Application.Commands;
using Application.Commands.Products;
using Application.Queries;
using AutoMapper;
using Domain.Products;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public ProductController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct(Guid id)
        {
            var query = new GetProductQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<ProductDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var query = new GetAllProductsQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<ProductDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddProduct([FromBody] AddProductCommand command)
        {

            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpDelete("{productId}")]
        public async Task<IActionResult> DeleteProduct(Guid productId)
        {

            var command = new DeleteProductCommand
            {
                Id = productId
            };

            await _mediator.Send(command);
            return Ok(productId);
        }

        [HttpPut("{productId}")]
        public async Task<IActionResult> UpdateProduct([FromBody] UpdateProductCommand command)
        {
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpPatch("inStock/{productId}")]
        public async Task<IActionResult> UpdateInStockProduct(Guid productId)
        {
            var command = new UpdateInStockProductCommand
            {
                Id = productId
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpPatch("outOfStock/{productId}")]
        public async Task<IActionResult> UpdateOutOfStockProduct(Guid productId)
        {

            var command = new UpdateOutOfStockProductCommand
            {
                Id = productId
            };
            var res = await _mediator.Send(command);

            return Ok(res);
        }
    }
}
