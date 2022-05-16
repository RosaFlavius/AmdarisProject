using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface ISupplementRepository
    {
        public void AddSupplement(Supplement supplement);
        public bool DeleteSupplement(Guid supplementId);
        public Supplement UpdateSupplement(Supplement supplement);
        public Task<Supplement> GetSupplement(Guid supplementId);
        public Task<IEnumerable<Supplement>> GetAllSupplements();
        public Task<int> SaveChangesAsync();


    }
}
