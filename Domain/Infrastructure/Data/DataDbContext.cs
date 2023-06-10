using Domain.Mail;
using Domain.Products;
using Domain.Users;
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
        public DataDbContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Clothes> Clothes { get; set; }
        public DbSet<Equipment> Equipments { get; set; }
        public DbSet<Supplement> Supplements { get; set; }
        public DbSet<OrderProducts> OrderProducts { get; set; }
        public DbSet<NotificationRequest> Notifications { get; set; }
        
        public DbSet<NotificationOrder> OrdersNotifications { get; set; }
        /*protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=DESKTOP-465R8PC\\SQLEXPRESS;Database=DZyzzDatabaseLicenta;Trusted_Connection=true");
        }
*/
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*modelBuilder.Entity<Order>()
                .HasMany(order => order.Products)
                .WithMany(product => product.Orders)
                .UsingEntity<OrderProducts>(
                op=>op.HasOne(x=>x.Product).WithMany().HasForeignKey(x=>x.ProductId),
                op=>op.HasOne(x=>x.Order).WithMany().HasForeignKey(x=>x.OrderId)
                );*/

            
            modelBuilder.Entity<OrderProducts>()
                .HasKey(scp => new { scp.OrderId, scp.ProductId });
            modelBuilder.Entity<NotificationRequest>().HasKey(x => x.NotificationId);
            modelBuilder.Entity<NotificationOrder>().HasKey(x => x.NotificationId);
            /*modelBuilder.Entity<NotificationRequest>().Property(x => x.NotificationId).ValueGeneratedOnAdd();*/

        }
    }
}
