using Domain.RepositoryPattern;
using Domain.Users;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DataDbContext _dbContext;

        public UserRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddUser(User user)
        {
            _dbContext.Users.Add(user);

        }

        public bool DeleteUser(Guid id)
        {
            var user = _dbContext.Users.FirstOrDefault(item => item.Id == id);
            if (user != null)
            {
                _dbContext.Remove(user);
                return true;
            }
            return false;
        }

        public User UpdateUser(User item)
        {
            var user = _dbContext.Users.FirstOrDefault(i => i.Id == item.Id);
            user = item;
            return user;

            
        }

        public async Task<User> GetUser(Guid id)
        {
            var user = await _dbContext.Users.FirstOrDefaultAsync(item => item.Id == id);

            if(user != null)
            {
                return user;
            }
            throw new ApplicationException($"User with id: {id} does not exist");

        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            return _dbContext.Users;
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }


    }
}
