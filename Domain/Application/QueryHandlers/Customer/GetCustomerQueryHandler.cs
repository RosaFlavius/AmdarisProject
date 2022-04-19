using Application.Queries;
using Application.Repositories;
using Domain.Customers;
using Domain.RepositoryPattern;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.QueryHandlers
{
    public class GetCustomerQueryHandler : IRequestHandler<GetCustomerQuery, Customer>
    {

        private readonly ICustomerRepository _customerRepo;

        public GetCustomerQueryHandler(ICustomerRepository customerRepo)
        {
            _customerRepo = customerRepo;
        }
            
        public async Task<Customer> Handle(GetCustomerQuery request, CancellationToken cancellationToken)
        {
            var customer = new Customer
            {
                Id = Guid.NewGuid(),
            };

            var result = await _customerRepo.GetCustomer(request.Id);
            return await Task.FromResult(result);
        }
    }
}
