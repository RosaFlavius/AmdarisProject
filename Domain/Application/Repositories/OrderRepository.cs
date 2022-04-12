using Domain.Products;
using Domain.RepositoryPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly List<Order> _orders;

        public OrderRepository()
        {
            _orders = new();
        }

        public void AddOrder(Order order)
        {
            _orders.Add(order);

        }

        public bool DeleteOrder(Guid id)
        {
            var order = _orders.FirstOrDefault(item => item.Id == id);
            if (order != null)
            {
                _orders.Remove(order);
                return true;
            }
            return false;
        }

        public bool UpdateOrder(Order item)
        {
            var order = _orders.FirstOrDefault(i => i.Id == item.Id);

            if (order != null)
            {
                
                return true;
            }
            return false;
        }

        public Order GetOrder(Guid id)
        {
            var order = _orders.FirstOrDefault(item => item.Id == id);

            if (order != null)
            {
                return order;
            }
            return null;

        }

        public IEnumerable<Order> GetAllOrders()
        {
            return _orders;
        }
    }
}
