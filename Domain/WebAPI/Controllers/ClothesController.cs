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
    public class ClothesController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public ClothesController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetClothes(Guid id)
        {
            var query = new GetClothesQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<ClothesDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllClothes()
        {
            var query = new GetAllClothesQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<ClothesDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddClothes(ClothesDTO product)
        {
            var commandProduct = new AddClothesCommand
            {
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                Gender = product.Gender,
                Size = product.Size,
                Img = product.Img,
            };

            await _mediator.Send(commandProduct);

            return Ok(product);
        }

        [HttpDelete("{clothesId}")]
        public async Task<IActionResult> DeleteClothes(Guid clothesId)
        {

            var command = new DeleteClothesCommand
            {
                Id = clothesId,
            };

            await _mediator.Send(command);
            return Ok(clothesId);
        }

        [HttpPatch("{clothesId}")]
        public async Task<IActionResult> UpdateClothes(ClothesDTO product, Guid clothesId)
        {

            var command = new UpdateClothesCommand
            {
                Id = clothesId,
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                Gender = product.Gender,
                Size = product.Size,
                Img = product.Img,

            };
            await _mediator.Send(command);

            return Ok(clothesId);
        }
    }
}
