using Domain.Customers;
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
    public class CustomerRepository : ICustomerRepository
    {
        private readonly DataDbContext _dbContext;

        public CustomerRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddCustomer(Customer customer)
        {
            _dbContext.Customers.Add(customer);

        }

        public bool DeleteCustomer(Guid id)
        {
            var customer = _dbContext.Customers.FirstOrDefault(item => item.Id == id);
            if (customer != null)
            {
                _dbContext.Remove(customer);
                return true;
            }
            return false;
        }

        public Customer UpdateCustomer(Customer item)
        {
            var customer = _dbContext.Customers.FirstOrDefault(i => i.Id == item.Id);
            customer = item;
            return customer;

            
        }

        public async Task<Customer> GetCustomer(Guid id)
        {
            var customer = await _dbContext.Customers.FirstOrDefaultAsync(item => item.Id == id);

            if(customer != null)
            {
                return customer;
            }
            throw new ApplicationException($"Customer with id: {id} does not exist");

        }

        public async Task<IEnumerable<Customer>> GetAllCustomers()
        {
            return _dbContext.Customers;
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }


    }
}
