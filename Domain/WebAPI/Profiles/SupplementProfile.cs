using AutoMapper;
using Domain.Products;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class SupplementProfile : Profile
    {
        public SupplementProfile()
        {
            CreateMap<Supplement, SupplementDTO>()
                .ReverseMap();
        }
    }
}
