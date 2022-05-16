using Application.Commands;
using Application.Queries;
using AutoMapper;
using Domain.Users;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using WebAPI.DTOs;

namespace WebAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class UserController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;
        public UserController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUser(Guid id)
        {
            var query = new GetUserQuery
            {
                Id = id
            };

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<UserDTO>(result);
            return Ok(dtoResult);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var query = new GetAllUsersQuery();

            var result = await _mediator.Send(query);
            var dtoResult = _mapper.Map<List<UserDTO>>(result);
            return Ok(dtoResult);
        }

        [HttpPost]
        public async Task<IActionResult> AddUser(UserDTO user)
        {
            var commandUser = new AddUserCommand
            {
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                County = user.County,
                City = user.City,
                Address = user.Address,
                Admin = user.Admin,

            };

            await _mediator.Send(commandUser);

            return Ok(user);
        }

        [HttpDelete("{userId}")]
        public async Task<IActionResult> DeleteUser(Guid userId)
        {

            var command = new DeleteUserCommand
            {
                Id = userId
            };

            await _mediator.Send(command);
            return Ok(userId);
        }

        [HttpPatch("{userId}")]
        public async Task<IActionResult> UpdateUser(UserDTO user, Guid userId)
        {

            var command = new UpdateUserCommand
            {
                Id = userId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                County = user.County,
                City = user.City,
                Address = user.Address,
                Admin = user.Admin,
            };
            await _mediator.Send(command);

            return Ok(userId);
        }

    }
}
