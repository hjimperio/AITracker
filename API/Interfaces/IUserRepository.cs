using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IUserRepository
    {
        void Update(AppUser user);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AppUser>> GetUsers();
        Task<AppUser> GetUserByUsernameAsync(string username);
        Task<PagedList<EmployeeDto>> GetEmployeesAsync(UserParams userParams);
        Task<EmployeeDto> GetEmployeeByUsernameAsync(string username);
    }
}