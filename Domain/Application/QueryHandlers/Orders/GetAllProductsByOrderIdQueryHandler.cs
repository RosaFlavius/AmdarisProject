using Application.DTOs;
using Application.Queries.Orders;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers.Orders
{
    public class GetAllProductsByOrderIdQueryHandler : IRequestHandler<GetAllProductsByOrderIdQuery, GetAllProductsByOrderIdDTO>
    {
        private readonly IOrderRepository _orderRepository;

        public GetAllProductsByOrderIdQueryHandler(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        public async Task<GetAllProductsByOrderIdDTO> Handle(GetAllProductsByOrderIdQuery request, CancellationToken cancellationToken)
        {
            var result = await _orderRepository.GetAllProductsByOrderId(request.OrderId);
            return await Task.FromResult(result);
        }
    }
}
