using Application.Commands;
using Application.Commands.clothes;
using Application.Queries;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SupplementController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public SupplementController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetSupplement(Guid id)
        {
            var query = new GetSupplementQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<SupplementDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllSupplements()
        {
            var query = new GetAllSupplementsQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<SupplementDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddSupplement(SupplementDTO product)
        {
            var commandProduct = new AddSupplementCommand
            {
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                TypeOfSupplement = product.TypeOfSupplement,
                Img = product.Img,
            };

            await _mediator.Send(commandProduct);

            return Ok(product);
        }

        [HttpDelete("{supplementId}")]
        public async Task<IActionResult> DeleteSupplement(Guid supplementId)
        {

            var command = new DeleteSupplementCommand
            {
                Id = supplementId,
            };

            await _mediator.Send(command);
            return Ok(supplementId);
        }

        [HttpPatch("{supplementId}")]
        public async Task<IActionResult> UpdateSupplement(SupplementDTO product, Guid supplementId)
        {

            var command = new UpdateSupplementCommand
            {
                Id = supplementId,
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                TypeOfSupplement = product.TypeOfSupplement,
                Img = product.Img,

            };
            await _mediator.Send(command);

            return Ok(supplementId);
        }
    }
}
