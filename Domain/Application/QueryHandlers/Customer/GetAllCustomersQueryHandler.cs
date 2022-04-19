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
    public class GetAllCustomersQueryHandler : IRequestHandler<GetAllCustomersQuery, IEnumerable<Customer>>
    {

        private readonly ICustomerRepository _customerRepo;

        public GetAllCustomersQueryHandler(ICustomerRepository customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public async Task<IEnumerable<Customer>> Handle(GetAllCustomersQuery request, CancellationToken cancellationToken)
        {

            var result = await _customerRepo.GetAllCustomers();
            return await Task.FromResult(result);
        }
    }
}
