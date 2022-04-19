using Application.Commands;
using Application.Commands.OrderProducts;
using Application.Commands.Orders;
using Application.Queries;
using Application.Queries.Orders;
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
            //await TestCustomerRepository();
            //await TestOrderRepository();
            //await TestProductRepository();
            //await TestOrderProduct();
        }

        private static void ConfigureMediator()
        {
            _diContainer = new ServiceCollection()
                .AddMediatR(typeof(AddCustomerCommand))
                .AddScoped<ICustomerRepository, CustomerRepository>()
                .AddScoped<IOrderRepository, OrderRepository>()
                .AddScoped<IProductRepository, ProductRepository>()
                .BuildServiceProvider();
            _mediator = _diContainer.GetRequiredService<IMediator>();
        }

        private static async Task TestCustomerRepository()
        {

            var customer = await _mediator.Send(new AddCustomerCommand { FirstName = "Flavius", LastName = "Rosa", Username = "RosaFlavius2000", Password = "parola" });
            Console.WriteLine(customer.FirstName);

            var customer1 = await _mediator.Send(new AddCustomerCommand { FirstName = "Gabriel", LastName = "Rosa", Username = "RosaFlavius2000", Password = "parola" });
            Console.WriteLine(customer1.FirstName);
            Console.WriteLine();
            var getCustomers = await _mediator.Send(new GetAllCustomersQuery());

            foreach (var i in getCustomers)
            {
                Console.WriteLine(i.FirstName);
            }

            Console.WriteLine();




            var delCustomer1 = await _mediator.Send(new DeleteCustomerCommand { Id = customer1.Id });
            Console.WriteLine(delCustomer1);

            var getCustomers1 = await _mediator.Send(new GetAllCustomersQuery());

            foreach (var i in getCustomers1)
            {
                Console.WriteLine(i.FirstName);
            }

            Console.WriteLine();
            Console.WriteLine();

            var updateCustomer = await _mediator.Send(new UpdateCustomerCommand { Id = customer.Id, FirstName = "Norbert", LastName = "Forgacs", Username = "RosaFlavius2000", Password = "parola" });
            Console.WriteLine(updateCustomer);
            Console.WriteLine();

            var getCustomer = await _mediator.Send(new GetCustomerQuery { Id = customer.Id });

            Console.WriteLine(getCustomer.FirstName);



        }

        private static async Task TestOrderRepository()
        {
            var listOfProduct = new List<Product>();
            listOfProduct.Add(new Product() { Name = "product1", Categories = Product.Category.Equipment, Description = "Brand new equipment", Price = 370, Brand = "MyProtein" });
            listOfProduct.Add(new Product() { Name = "product2", Categories = Product.Category.Clothes, Description = "Brand new clothes", Price = 230, Brand = "MyProtein" });
            var order = await _mediator.Send(new AddOrderCommand { TotalPrice = 12000 });
            Console.WriteLine(order.Products);

            var order1 = await _mediator.Send(new AddOrderCommand { TotalPrice = 130000 });
            Console.WriteLine(order1.Products);


            var getOrders = await _mediator.Send(new GetAllOrdersQuery());
            foreach (var i in getOrders)
            {
                Console.WriteLine(i.Id);
            }
            Console.WriteLine();
            var getOrder = await _mediator.Send(new GetOrderQuery { Id = order.Id });
            Console.WriteLine(getOrder.Id);
            Console.WriteLine();

            var getOrders1 = await _mediator.Send(new GetAllOrdersQuery());
            foreach (var i in getOrders1)
            {
                Console.WriteLine(i.Id);
            }

            Console.WriteLine();

            var deleteOrder1 = await _mediator.Send(new DeleteOrderCommand { Id = order1.Id });
            Console.WriteLine(deleteOrder1);

            Console.WriteLine();

            var getOrders2 = await _mediator.Send(new GetAllOrdersQuery());
            foreach (var i in getOrders2)
            {
                Console.WriteLine(i.Id);
            }
            Console.WriteLine();

            var updateOrder = await _mediator.Send(new UpdateOrderCommand { Id = order.Id, TotalPrice = 123 });
            Console.WriteLine(updateOrder);
            Console.WriteLine(order.TotalPrice);
        }

        public static async Task TestProductRepository()
        {
            var listOfOrder = new List<Order>();

            var product1 = await _mediator.Send(
                new AddProductCommand
                {
                    Name = "product1",
                    Brand = "MyProtein",
                    Price = 1400,
                    Description = "brand new supplement",
                    Categories = (AddProductCommand.Category)Product.Category.Supplements
                });

            Console.WriteLine(product1.Name + " " + product1.Brand);

            var product2 = await _mediator.Send(
                 new AddProductCommand
                 {
                     Name = "product2",
                     Brand = "GymBeam",
                     Price = 120,
                     Description = "brand new clothes",
                     Categories = (AddProductCommand.Category)Product.Category.Clothes
                 });
            Console.WriteLine(product2.Name + " " + product2.Brand);
            Console.WriteLine();

            var getProducts = await _mediator.Send(new GetAllProductsQuery());

            foreach (var i in getProducts)
            {
                Console.WriteLine(i.Name + " " + i.Brand);
            }

            Console.WriteLine();

            var getProduct1 = await _mediator.Send(new GetProductQuery { Id = product1.Id });


            Console.WriteLine(getProduct1.Name + " " + getProduct1.Brand);
            Console.WriteLine();

            var delProduct1 = await _mediator.Send(new DeleteProductCommand { Id = product1.Id });
            Console.WriteLine(delProduct1);

            var getProducts1 = await _mediator.Send(new GetAllProductsQuery());

            foreach (var i in getProducts1)
            {
                Console.WriteLine(i.Name + " " + i.Brand);
            }


            Console.WriteLine();
            Console.WriteLine();

            var updateProduct2 = await _mediator.Send(
                new UpdateProductCommand
                {
                    Id = product2.Id,
                    Name = "product2_V2",
                    Brand = "MyProtein",
                    Price = 120,
                    Description = "brand new clothes",
                    Orders = listOfOrder,
                    Categories = (UpdateProductCommand.Category)Product.Category.Clothes
                });
            Console.WriteLine(updateProduct2);
            Console.WriteLine();

            var getProducts2 = await _mediator.Send(new GetAllProductsQuery());

            foreach (var i in getProducts2)
            {
                Console.WriteLine(i.Name + " " + i.Brand);
            }


        }
        public static async Task TestOrderProduct()
        {
            var product1 = await _mediator.Send(
               new AddProductCommand
               {
                   Name = "product1",
                   Brand = "MyProtein",
                   Price = 1400,
                   Description = "brand new supplement",
                   Categories = (AddProductCommand.Category)Product.Category.Supplements
               });

            var order = await _mediator.Send(new AddOrderCommand { TotalPrice = 12000 });

            await _mediator.Send(new AddOrderProductsCommand { Order = order, Product = product1 });



        }
    }
}