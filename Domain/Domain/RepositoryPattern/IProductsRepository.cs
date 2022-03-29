using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IProductsRepository
    {
        public Task CreateProductAsync(Product product);
        public Task DeleteProductAsync(Product product);
        public Task UpdateProductAsync(Product product);
        public Task<Product> FindProductAsync(Guid productId);

    }
}
