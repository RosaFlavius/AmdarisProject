using Application.Queries.Orders;
using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers.Orders
{
    public class GetOrderQueryHandler : IRequestHandler<GetOrderQuery, Order>
    {

        private readonly IOrderRepository _orderRepo;

        public GetOrderQueryHandler(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<Order> Handle(GetOrderQuery request, CancellationToken cancellationToken)
        {
            var result = await _orderRepo.GetOrder(request.Id);
            return await Task.FromResult(result);
        }
    }
}
