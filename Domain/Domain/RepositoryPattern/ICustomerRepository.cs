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
        public bool UpdateCustomer(Customer customer);
        public Customer GetCustomer(Guid customerId);
        public IEnumerable<Customer> GetAllCustomers();

    }
}
