using Domain.Customers;
using Domain.RepositoryPattern;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class CustomerRepository : ICustomerRepository
    {
        private readonly List<Customer> _customers;

        public CustomerRepository()
        {
            _customers = new();
        }

        public void AddCustomer(Customer customer)
        {
            _customers.Add(customer);

        }

        public bool DeleteCustomer(Guid id)
        {
            var customer = _customers.FirstOrDefault(item => item.Id == id);
            if (customer != null)
            {
                _customers.Remove(customer);
                return true;
            }
            return false;
        }

        public bool UpdateCustomer(Customer item)
        {
            var customer = _customers.FirstOrDefault(i => i.Id == item.Id);

            if (customer != null)
            {
                customer.FirstName = item.FirstName;
                customer.LastName = item.LastName;
                customer.Username = item.Username;
                customer.Password = item.Password;
                return true;
            }
            return false;
        }

        public Customer GetCustomer(Guid id)
        {
            var customer = _customers.FirstOrDefault(item => item.Id == id);

            if(customer != null)
            {
                return customer;
            }
            return null;

        }

        public IEnumerable<Customer> GetAllCustomers()
        {
            return _customers;
        }


    }
}
