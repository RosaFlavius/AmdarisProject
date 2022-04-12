using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Customers
{
    public class Customer
    {
        public Customer(string firstName, string lastName, string username, string password)
        {
            Id = Guid.NewGuid();
            FirstName = firstName;
            LastName = lastName;
            Username = username;
            Password = password;

            if (string.IsNullOrEmpty(firstName))
                throw new ArgumentNullException("Null_firstName");

            if (string.IsNullOrEmpty(lastName))
                throw new ArgumentNullException("Null_lastName");

            if (string.IsNullOrEmpty(username))
                throw new ArgumentNullException("Null_username");

            if (string.IsNullOrEmpty(password))
                throw new ArgumentNullException("Null_password");

        }

        public Customer()
        {

        }

        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }


    }
}
