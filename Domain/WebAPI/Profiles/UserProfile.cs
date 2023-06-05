using AutoMapper;
using Domain.Users;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<User, UserDTO>()
                .ForMember(u=>u.Id, opt=>opt.MapFrom(u1=>u1.UserId))
                .ReverseMap();

        }
    }
}
