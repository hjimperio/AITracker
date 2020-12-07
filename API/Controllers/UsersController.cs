using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeeDto>>> GetUsers()
        {
            var users = await _userRepository.GetEmployeesAsync();

            return Ok(users);
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<EmployeeDto>> GetUser(string username)
        {   
            return await _userRepository.GetEmployeeByUsernameAsync(username);
        }
    }
}