using Application.Commands.Orders;
using Domain.Products;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.Orders
{
    public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand, Order>
    {
        private readonly IOrderRepository _orderRepo;

        public UpdateOrderCommandHandler(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<Order> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetOrder(request.Id);
            order.TotalPrice = request.TotalPrice;
            order.Id = request.Id;

            Order result = _orderRepo.UpdateOrder(order);
            await _orderRepo.SaveChangesAsync();
            return await Task.FromResult(result);
        }
    }
}
