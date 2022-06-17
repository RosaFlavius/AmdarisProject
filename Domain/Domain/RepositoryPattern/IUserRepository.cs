using Domain.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IUserRepository
    {
        public void AddUser(User user);
        public bool DeleteUser(Guid userId);
        public User UpdateUser(User user);
        public Task<User> GetUser(Guid userId);
        public Task<User> GetUserByEmail(string userEmail);
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<int> SaveChangesAsync();

    }
}
