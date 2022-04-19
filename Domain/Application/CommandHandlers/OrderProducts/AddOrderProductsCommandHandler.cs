using Application.Commands.OrderProducts;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers.OrderProducts
{
    public class AddOrderProductsCommandHandler :IRequestHandler<AddOrderProductsCommand, Guid>
    {
        private readonly IOrderRepository _orderRepo;

        public AddOrderProductsCommandHandler(IOrderRepository orderRepo)
        {
            _orderRepo = orderRepo;
        }

        public async Task<Guid> Handle(AddOrderProductsCommand request, CancellationToken cancellationToken)
        {
            var order =  await _orderRepo.AddProductToOrder(request.Order, request.Product);

            return request.Product.Id;
            
        }
    }
}
