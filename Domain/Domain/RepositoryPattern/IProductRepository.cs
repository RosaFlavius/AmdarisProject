using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
        public interface IProductRepository
        {
            public void AddProduct(Product product);
            public bool DeleteProduct(Guid productId);
            public Product UpdateProduct(Product product);
            public Task<Product> GetProduct(Guid productId);
            public Task<IEnumerable<Product>> GetAllProducts();
            public Task<int> SaveChangesAsync();
        }
}
