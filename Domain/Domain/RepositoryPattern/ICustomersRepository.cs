using Domain.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface ICustomersRepository
    {
        public Task CreateCustomerAsync(Customer customer);
        public Task DeleteCustomerAsync(Customer customer);
        public Task UpdateCustomerAsync(Customer customer);
        public Task<Customer> FindCustomerAsync(Guid customerId);
    }
}
