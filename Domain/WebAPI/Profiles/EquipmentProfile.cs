using AutoMapper;
using Domain.Products;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class EquipmentProfile : Profile
    {
        public EquipmentProfile()
        {
            CreateMap<Equipment, EquipmentDTO>()
                .ReverseMap();
        }
    }
}
