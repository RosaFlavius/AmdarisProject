using Domain.Customers;
using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Admin
{
    public class Admin
    {
        private const string _username = "admin";
        private const string _password = "admin";

        public Admin(List<Customer> customers, List<Category> categories)
        {
            Customers = new List<Customer>();
            Categories = new List<Category>();
        }

        public List<Customer> Customers { get; set; }
        public List<Category> Categories { get; }

        public void AddProduct(Category category, string name, string description, string company, float price)
        {
            Product product = new Product(name, description, company, price);
            category.Products.Add(product);
        }

    }
}
