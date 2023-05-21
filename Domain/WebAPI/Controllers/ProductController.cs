using Application.Commands;
using Application.Queries;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

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
    }
}
