using Application.Commands.OrderProduct;
using Domain.RepositoryPattern;
using MediatR;

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
             _orderRepo.AddProductToOrder(request.ProductId, request.OrderId);

            await _orderRepo.SaveChangesAsync();

            return Guid.NewGuid();
            
        }
    }
}
