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
    public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand, bool>
    {
        private readonly IOrderRepository _orderRepo;

        public DeleteOrderCommandHandler(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<bool> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
        {
            var order = await _orderRepo.GetOrder(request.Id);

            bool result = _orderRepo.DeleteOrder(request.Id);
            await _orderRepo.SaveChangesAsync();
            return await Task.FromResult(result);
        }
    }
}
