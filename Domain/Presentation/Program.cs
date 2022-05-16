using Application.Commands;
using Application.Commands.clothes;
using Application.Commands.OrderProduct;
using Application.Commands.Orders;
using Application.Queries;
using Application.Queries.Orders;
using Application.Repositories;
using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using static Domain.Products.Product;

namespace MyApp // Note: actual namespace depends on the project name.
{
    public class Program
    {
        private static IMediator _mediator;
        private static ServiceProvider _diContainer;
        private static async Task Main(string[] args)
        {
            ConfigureMediator();
            //await TestUserRepository();
            //await TestOrderRepository();
            //await TestProductRepository();
            //await TestOrderProduct();
        }

        private static void ConfigureMediator()
        {
            _diContainer = new ServiceCollection()
                .AddMediatR(typeof(AddUserCommand))
                .AddScoped<IUserRepository, UserRepository>()
                .AddScoped<IOrderRepository, OrderRepository>()
                .AddScoped<IProductRepository, ProductRepository>()
                //.AddDbContext<DataDbContext>(options => options.UseSqlServer("Server=DESKTOP-465R8PC\\SQLEXPRESS;Database=DZyzzGainsDatabase;Trusted_Connection=true"))
                .BuildServiceProvider();
            _mediator = _diContainer.GetRequiredService<IMediator>();
        }

        private static async Task TestUserRepository()
        {

            var user = await _mediator.Send(new AddUserCommand { FirstName = "Flavius", LastName = "Rosa", Email = "RosaFlavius2000@amdaris.com", Password = "parola", Address = "BanuMaracine", Admin = false, City = "Arad", County = "Romania"});
            Console.WriteLine(user.FirstName);

            var user1 = await _mediator.Send(new AddUserCommand { FirstName = "Gabriel", LastName = "Rosa", Email = "RosaFlavius2000@amdaris.com", Password = "parola", Address = "BanuMaracine", Admin = false, City = "Arad", County = "Romania" });
            Console.WriteLine(user1.FirstName);
            Console.WriteLine();
            var getUsers = await _mediator.Send(new GetAllUsersQuery());

            foreach (var i in getUsers)
            {
                Console.WriteLine(i.FirstName);
            }

            Console.WriteLine();




            var delUser1 = await _mediator.Send(new DeleteUserCommand { Id = user1.Id });
            Console.WriteLine(delUser1);

            var getUser1 = await _mediator.Send(new GetAllUsersQuery());

            foreach (var i in getUser1)
            {
                Console.WriteLine(i.FirstName);
            }

            Console.WriteLine();
            Console.WriteLine();

            var updateUser = await _mediator.Send(new UpdateUserCommand { Id = user.Id, FirstName = "Norbert", LastName = "Forgacs", Email = "RosaFlavius2000@amdaris.com", Password = "parola", Address = "BanuMaracine", Admin = false, City = "Arad", County = "Romania" });
            Console.WriteLine(updateUser);
            Console.WriteLine();

            var getUser = await _mediator.Send(new GetUserQuery { Id = user.Id });

            Console.WriteLine(getUser.FirstName);



        }

        private static async Task TestOrderRepository()
        {
            var listOfProduct = new List<Product>();
            listOfProduct.Add(new Product() { Name = "product1", Category = ProductCategory.Equipment, Description = "Brand new equipment", Price = 370, Brand = "MyProtein" });
            listOfProduct.Add(new Product() { Name = "product2", Category = ProductCategory.Clothes, Description = "Brand new clothes", Price = 230, Brand = "MyProtein" });
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

            var productClothes1 = await _mediator.Send(
               new AddClothesCommand
               {
                   Name = "T-Shirt",
                   Brand = "MyProtein",
                   Price = 1400,
                   Description = "cotton",
                   Gender = Clothes.ClothesGender.Men,
                   Size = Clothes.ClothesSize.M,
               });

            Console.WriteLine(productClothes1.Name + " " + productClothes1.Brand);

            var updateClothes1 = await _mediator.Send(
               new UpdateClothesCommand
               {
                   Name = "Hoodie",
                   Brand = "GymBeam",
                   Price = 1400,
                   Description = "cotton",
                   Gender = Clothes.ClothesGender.Woman,
                   Size = Clothes.ClothesSize.S,
               });

            Console.WriteLine(updateClothes1.Name + " " + updateClothes1.Brand);

            /* var product1 = await _mediator.Send(
                 new AddProductCommand
                 {
                     Name = "product1",
                     Brand = "MyProtein",
                     Price = 1400,
                     Description = "brand new supplement",
                     Categories =  Category.Supplements
                 });

             Console.WriteLine(product1.Name + " " + product1.Brand);*/

            /* var product2 = await _mediator.Send(
                  new AddProductCommand
                  {
                      Name = "product2",
                      Brand = "GymBeam",
                      Price = 120,
                      Description = "brand new clothes",
                      Categories = Category.Clothes
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
                     Categories = Category.Clothes
                 });
             Console.WriteLine(updateProduct2);
             Console.WriteLine();

             var getProducts2 = await _mediator.Send(new GetAllProductsQuery());

             foreach (var i in getProducts2)
             {
                 Console.WriteLine(i.Name + " " + i.Brand);
             }*/


        }
        public static async Task TestOrderProduct()
        {
            var product = await _mediator.Send(
               new AddProductCommand
               {
                   Name = "PRODUCT",
                   Brand = "TEST",
                   Price = 1400,
                   Description = "brand new supplement",
                   Category = ProductCategory.Supplements
               });

            var order = await _mediator.Send(new AddOrderCommand { TotalPrice = 23000 });

            await _mediator.Send(new AddOrderProductsCommand {OrderId = order.Id, ProductId = product.Id });

    




        }
    }
}