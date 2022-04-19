﻿using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly DataDbContext _dbContext;

        public OrderRepository()
        {
            _dbContext = new DataDbContext();
        }

        public void AddOrder(Order order)
        {
            _dbContext.Add(order);

        }

        public bool DeleteOrder(Guid id)
        {
            var order = _dbContext.Orders.FirstOrDefault(item => item.Id == id);
            if (order != null)
            {
                _dbContext.Remove(order);
                return true;
            }
            return false;
        }

        public Order UpdateOrder(Order item)
        {
            var order = _dbContext.Orders.FirstOrDefault(i => i.Id == item.Id);
            order = item;
            return order;

        }

        public async Task<Order> GetOrder(Guid id)
        {
            var order = await _dbContext.Orders.FirstOrDefaultAsync(item => item.Id == id);

            if (order != null)
            {
                return order;
            }
            throw new ApplicationException($"Order with id: {id} does not exist");

        }

        public async Task<IEnumerable<Order>> GetAllOrders()
        {
            return _dbContext.Orders;
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }

        public async Task<Guid> AddProductToOrder(Order order, Product product)
        {
            var item = new OrderProducts { Order = order, Product = product };

            _dbContext.OrderProducts.Add(item);
            _dbContext.SaveChanges();

            return item.Id;

        }
    }
}
