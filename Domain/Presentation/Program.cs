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
    [Obsolete]
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
    }
}