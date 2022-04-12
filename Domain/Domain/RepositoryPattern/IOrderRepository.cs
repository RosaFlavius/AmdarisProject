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
        public bool UpdateOrder(Order Order);
        public Order GetOrder(Guid orderId);
        public IEnumerable<Order> GetAllOrders();
    }
}
