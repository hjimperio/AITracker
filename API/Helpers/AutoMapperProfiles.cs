using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<AppUser, EmployeeDto>();
            CreateMap<RegisterDto, AppUser>();
            CreateMap<EmployeeUpdateDto, AppUser>();
            CreateMap<ActionItemAddDto, ActionItem>();
            CreateMap<ActionItemUpdateDto, ActionItem>();
            CreateMap<ActionItem, ActionItemDto>();
        }
    }
}