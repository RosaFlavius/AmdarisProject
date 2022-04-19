using Domain.Customers;
using Domain.Products;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data
{
    public class DataDbContext : DbContext
    {

        public DbSet<Customer> Customers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Clothes> Clothes { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Supplement> Supplements { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-465R8PC\\SQLEXPRESS;Database=DZyzzGainsDatabase;Trusted_Connection=true");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.Entity<Order>()
                .HasMany(order => order.Products)
                .WithMany(product => product.Orders)
                .UsingEntity<OrderProducts>(
                op=>op.HasOne(x=>x.Product).WithMany().HasForeignKey(x=>x.ProductId),
                op=>op.HasOne(x=>x.Order).WithMany().HasForeignKey(x=>x.OrderId)
                );*/

        }
    }
}
