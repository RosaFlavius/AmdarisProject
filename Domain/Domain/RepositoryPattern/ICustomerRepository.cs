using Domain.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface ICustomerRepository
    {
        public void AddCustomer(Customer customer);
        public bool DeleteCustomer(Guid customerId);
        public Customer UpdateCustomer(Customer customer);
        public Task<Customer> GetCustomer(Guid customerId);
        public Task<IEnumerable<Customer>> GetAllCustomers();
        public Task<int> SaveChangesAsync();

    }
}
