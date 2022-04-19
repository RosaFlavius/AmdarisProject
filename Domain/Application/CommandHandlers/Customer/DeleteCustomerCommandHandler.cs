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
    public class DeleteCustomerCommandHandler : IRequestHandler<DeleteCustomerCommand, bool>
    {
        private readonly ICustomerRepository _customerRepo;

        public DeleteCustomerCommandHandler(ICustomerRepository customerRepo)
        {
            _customerRepo = customerRepo;
        }

        public async Task<bool> Handle(DeleteCustomerCommand request, CancellationToken cancellationToken)
        {
            var customer = await _customerRepo.GetCustomer(request.Id);
            bool result = _customerRepo.DeleteCustomer(request.Id);
            await _customerRepo.SaveChangesAsync(); 
            return await Task.FromResult(result);
        }
    }
}
