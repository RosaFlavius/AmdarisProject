using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class SupplementRepository : ISupplementRepository
    {
        private readonly DataDbContext _dbContext;

        public SupplementRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddSupplement(Supplement supplement)
        {
            _dbContext.Add(supplement);
        }

        public bool DeleteSupplement(Guid id)
        {
            var supplement = _dbContext.Supplements.FirstOrDefault(item => item.Id == id);
            if (supplement != null)
            {
                _dbContext.Remove(supplement);
                return true;
            }
            return false;
        }

        public Supplement UpdateSupplement(Supplement item)
        {

            var supplement = _dbContext.Supplements.FirstOrDefault(i => i.Id == item.Id);
            supplement = item;
            return supplement;
        }

        public async Task<Supplement> GetSupplement(Guid id)
        {
            var supplement = await _dbContext.Supplements.FirstOrDefaultAsync(item => item.Id == id);

            if (supplement != null)
            {
                return supplement;
            }
            throw new ApplicationException($"Supplement with id: {id} does not exist");

        }

        public async Task<IEnumerable<Supplement>> GetAllSupplements()
        {
            return await _dbContext.Supplements.ToListAsync();
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }
    }
}
