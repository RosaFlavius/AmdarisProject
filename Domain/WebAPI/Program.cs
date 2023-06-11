using Application.Abstract;
using Application.Commands;
using Application.Repositories;
using Application.Services;
using Domain.ConfigDTOs;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using MediatR;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddMediatR(typeof(AddUserCommand));
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());

builder.Services.AddDbContext<DataDbContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();
builder.Services.AddScoped<IClothesRepository, ClothesRepository>();
builder.Services.AddScoped<IEquipmentRepository, EquipmentRepository>();
builder.Services.AddScoped<ISupplementRepository, SupplementRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationRepository>();
builder.Services.AddScoped<IOrderNotificationsRepository, OrderNotificationsRepository>();

builder.Services.Configure<EmailProviderConfig>(builder.Configuration.GetSection(nameof(EmailProviderConfig)));
builder.Services.AddHttpClient<IEmailService, EmailProvider>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
