using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IOrderRepository
    {
        public void AddOrder(Order order);
        public bool DeleteOrder(Guid orderId);
        public Order UpdateOrder(Order Order);
        public Task<Order> GetOrder(Guid orderId);
        public Task<IEnumerable<Order>> GetAllOrders();
        public void AddProductToOrder(Order order, Product product, Guid productId, Guid orderId);
        public Task<int> SaveChangesAsync();
    }
}
