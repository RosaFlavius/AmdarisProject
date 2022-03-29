using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface CategoriesRepository
    {
        public Task CreateCategoryAsync(Category category);
        public Task DeleteCategoryAsync(Category category);
        public Task UpdateCategoryAsync(Category category);
        public Task<Category> FindCustomerAsync(Guid categoryId);
    }
}
