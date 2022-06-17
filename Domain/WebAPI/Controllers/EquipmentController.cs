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
    public class EquipmentController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public EquipmentController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetEquipment(Guid id)
        {
            var query = new GetEquipmentQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<EquipmentDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllEquipment()
        {
            var query = new GetAllEquipmentQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<EquipmentDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddEquipment(NewEquipmentDTO product)
        {
            var commandProduct = new AddEquipmentCommand
            {
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                TypeOfEquipment = product.TypeOfEquipment,
                Img = product.Img,
            };

            await _mediator.Send(commandProduct);

            return Ok(product);
        }

        [HttpDelete("{equipmentId}")]
        public async Task<IActionResult> DeleteEquipment(Guid equipmentId)
        {

            var command = new DeleteEquipmentCommand
            {
                Id = equipmentId,
            };

            await _mediator.Send(command);
            return Ok(equipmentId);
        }

        [HttpPut("{equipmentId}")]
        public async Task<IActionResult> UpdateEquipment(EquipmentDTO product, Guid equipmentId)
        {

            var command = new UpdateEquipmentCommand
            {
                Id = equipmentId,
                Name = product.Name,
                Description = product.Description,
                Brand = product.Brand,
                Price = product.Price,
                TypeOfEquipment = product.TypeOfEquipment,
                Img = product.Img,

            };
            await _mediator.Send(command);

            return Ok(equipmentId);
        }
    }
}
