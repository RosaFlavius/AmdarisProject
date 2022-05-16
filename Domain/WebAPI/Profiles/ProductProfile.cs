using AutoMapper;
using Domain.Products;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class ProductProfile : Profile
    {
        public ProductProfile()
        {
            CreateMap<Product, ProductDTO>()
                .ReverseMap();
        }
    }
}
