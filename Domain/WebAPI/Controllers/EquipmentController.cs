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
        public async Task<IActionResult> AddEquipment([FromBody] AddEquipmentCommand command)
        {
            var res = await _mediator.Send(command);

            return Ok(res);
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
        public async Task<IActionResult> UpdateEquipment([FromBody] UpdateEquipmentCommand command)
        {
           var res =  await _mediator.Send(command);

            return Ok(res);
        }
    }
}
