using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(IUserRepository userRepository, IMapper mapper)
        {
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetUsers([FromQuery]UserParams userParams)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());
            userParams.CurrentUsername = User.GetUsername();

            var users = await _userRepository.GetEmployeesAsync(userParams);

            Response.AddPaginationHeader(users.CurrentPage, users.PageSize, 
                users.TotalCount, users.TotalPages);

            return Ok(users);
        }

        [HttpGet("list")]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetUserList()
        {
            var users = await _userRepository.GetUsers();
            return Ok(_mapper.Map<IEnumerable<AppUser>, IEnumerable<EmployeeDto>>(users));
        }

        [HttpGet("{username}", Name = "GetUser")]
        public async Task<ActionResult<EmployeeDto>> GetUser(string username)
        {
            return await _userRepository.GetEmployeeByUsernameAsync(username);
        }

        [HttpPut]
        public async Task<ActionResult> UpdateUser(EmployeeUpdateDto memberUpdateDto)
        {
            var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

            _mapper.Map(memberUpdateDto, user);
            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update user");
        }
    }
}