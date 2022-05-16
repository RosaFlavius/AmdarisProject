using AutoMapper;
using Domain.Products;
using WebAPI.DTOs;

namespace WebAPI.Profiles
{
    public class OrderProfile : Profile
    {
        public OrderProfile()
        {
            CreateMap<Order, OrderDTO>()
                .ReverseMap();
        }
    }
}
