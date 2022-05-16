using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Users
{
    public class User
    {
        

        public User()
        {

        }

        public User(string firstName, string lastName, string email, string password, string county, string city, string address, bool admin)
        {
            Id = Guid.NewGuid();
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            County = county;
            City = city;
            Address = address;
            Admin = admin;
        }

        

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string County { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public bool Admin { get; set; }


    }
}
