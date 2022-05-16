using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IClothesRepository
    {
        public void AddClothes(Clothes clothes);
        public bool DeleteClothes(Guid clothesId);
        public Clothes UpdateClothes(Clothes clothes);
        public Task<Clothes> GetClothes(Guid clothesId);
        public Task<IEnumerable<Clothes>> GetAllClothes();
        public Task<int> SaveChangesAsync();


    }
}
