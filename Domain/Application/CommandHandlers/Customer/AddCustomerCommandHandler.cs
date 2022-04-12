using Application.Commands;
using Application.Repositories;
using Domain.Customers;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.CommandHandlers
{
    public class AddCustomerCommandHandler : IRequestHandler<AddCustomerCommand, Customer>
    {
        private readonly ICustomerRepository _customerRepo;
        public AddCustomerCommandHandler(ICustomerRepository customerRepository) 
        {
            _customerRepo = customerRepository;
        }
        public async Task<Customer> Handle(AddCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = new Customer
            {
                FirstName = request.FirstName,  
                LastName = request.LastName,
                Username = request.Username,
                Password = request.Password,
                Id = Guid.NewGuid(),
            };

             _customerRepo.AddCustomer(customer);
            return customer;
        }
    }
}
