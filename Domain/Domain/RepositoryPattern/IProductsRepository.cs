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
        public Task AddProduct(Product product);
        public Task DeleteProduct(Product product);
        public Task UpdateProduct(Product product);
        public Task<Product> FindProduct(Guid productId); 

    }
}
