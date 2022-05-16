using AutoMapper;
using Domain.Products;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class ClothesProfile : Profile
    {
        public ClothesProfile()
        {
            CreateMap<Clothes, ClothesDTO>()
                .ReverseMap();
        }
    }
}
