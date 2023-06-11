using Domain.Mail;
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

        public User(string firstName, string lastName, string email, string password, string dateOfBirth, string phone, string country, string city, string address, bool admin)
        {
            FirstName = firstName;
            LastName = lastName;
            Email = email;
            Password = password;
            DateOfBirth = dateOfBirth;
            Phone = phone;
            Country = country;
            City = city;
            Address = address;
            Admin = admin;
        }

        

        public Guid UserId { get; set; } =  Guid.NewGuid();
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string DateOfBirth { get; set; }
        public string Phone { get; set; }
        public string Country { get; set; }
        public string City { get; set; }
        public string Address { get; set; }
        public bool Admin { get; set; }
        public ICollection<NotificationRequest> Notifications { get; set; }


    }
}
