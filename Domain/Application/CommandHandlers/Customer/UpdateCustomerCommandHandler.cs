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
    public class UpdateCustomerCommandHandler : IRequestHandler<UpdateCustomerCommand, Customer>
    {
        private readonly ICustomerRepository _customerRepo;

        public UpdateCustomerCommandHandler(ICustomerRepository customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public async Task<Customer> Handle(UpdateCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepo.GetCustomer(request.Id);
            customer.Id = request.Id;
            customer.FirstName = request.FirstName;
            customer.LastName = request.LastName;
            customer.Username = request.Username;
            customer.Password = request.Password;

            Customer result = _customerRepo.UpdateCustomer(customer);
            await _customerRepo.SaveChangesAsync();
            return await Task.FromResult(result);
        }
    }
}
