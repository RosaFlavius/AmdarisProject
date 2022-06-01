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
    public class ProductRepository : IProductRepository
    {
        private readonly DataDbContext _dbContext;

        public ProductRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddProduct(Product product)
        {
            _dbContext.Add(product);
        }

        public bool DeleteProduct(Guid id)
        {
            var product = _dbContext.Products.FirstOrDefault(item => item.Id == id);
            if (product != null)
            {
                _dbContext.Remove(product);
                return true;
            }
            return false;
        }

        public Product UpdateProduct(Product item)
        {
            var product = _dbContext.Products.FirstOrDefault(i => i.Id == item.Id);
            product = item;
            return product;
        }

        public async Task<Product> GetProduct(Guid id)
        {
            var product = await _dbContext.Products.FirstOrDefaultAsync(item => item.Id == id);

            if (product != null)
            {
                return product;
            }
            throw new ApplicationException($"Product with id: {id} does not exist");

        }

        public async Task<IEnumerable<Product>> GetAllProducts()
        {
            return _dbContext.Products.ToList();
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }
    }
}
