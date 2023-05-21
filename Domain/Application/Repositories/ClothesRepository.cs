using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static Domain.Products.Product;

namespace Application.Repositories
{
    public class ClothesRepository : IClothesRepository
    {
        private readonly DataDbContext _dbContext;

        public ClothesRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddClothes(Clothes clothes)
        {
            _dbContext.Add(clothes);
        }

        public bool DeleteClothes(Guid id)
        {
            var clothes = _dbContext.Clothes.FirstOrDefault(item => item.Id == id);
            if (clothes != null)
            {
                _dbContext.Remove(clothes);
                return true;
            }
            return false;
        }

        public Clothes UpdateClothes(Clothes item)
        {

            var clothes = _dbContext.Clothes.FirstOrDefault(i => i.Id == item.Id);
            clothes = item;
            return clothes;
        }

        public async Task<Clothes> GetClothes(Guid id)
        {
            var clothes = await _dbContext.Clothes.FirstOrDefaultAsync(item => item.Id == id);

            if (clothes != null)
            {
                return clothes;
            }
            throw new ApplicationException($"Clothes with id: {id} does not exist");

        }

        public async Task<IEnumerable<Clothes>> GetAllClothes()
        {
            return await _dbContext.Clothes.ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }
    }
}
