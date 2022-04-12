using Application.Commands;
using Application.Queries;
using Application.Repositories;
using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace MyApp // Note: actual namespace depends on the project name.
{
    public class Program
    {
        private static IMediator _mediator;
        private static ServiceProvider _diContainer;
        private static async Task Main(string[] args)
        {

            

           ConfigureMediator();
           await TestCustomerRepository();

        }

        private static void ConfigureMediator()
        {
            _diContainer = new ServiceCollection()
                .AddMediatR(typeof(AddCustomerCommand))
                .AddScoped<ICustomerRepository, CustomerRepository>()
                .BuildServiceProvider();
            _mediator = _diContainer.GetRequiredService<IMediator>();
        }

        private static async Task TestCustomerRepository()
        {
            //Console.WriteLine("Dadsad");
            var customer = await _mediator.Send(new AddCustomerCommand { FirstName = "Flavius", LastName = "Rosa", Username = "RosaFlavius2000", Password = "parola" });
            Console.WriteLine(customer.FirstName);

            var customer1 = await _mediator.Send(new AddCustomerCommand { FirstName = "Gabriel", LastName = "Rosa", Username = "RosaFlavius2000", Password = "parola" });
            Console.WriteLine(customer1.FirstName);

            var getCustomers = await _mediator.Send(new GetAllCustomersQuery());

            foreach (var i in getCustomers)
            {
                Console.WriteLine(i.FirstName);
            }

            var getCustomer1 = await _mediator.Send(new GetCustomerQuery { Id = customer1.Id });

            Console.WriteLine(getCustomer1.FirstName);

           var delCustomer1 = await _mediator.Send(new DeleteCustomerCommand { Id = customer1.Id });
           Console.WriteLine(delCustomer1);

           var updateCustomer = await _mediator.Send(new UpdateCustomerCommand { Id = customer.Id ,FirstName = "Norbert", LastName = "Forgacs", Username = "RosaFlavius2000", Password = "parola" });
           Console.WriteLine(updateCustomer);

            var getCustomer = await _mediator.Send(new GetCustomerQuery { Id = customer.Id });

            Console.WriteLine(getCustomer.FirstName);
        }
    }
}