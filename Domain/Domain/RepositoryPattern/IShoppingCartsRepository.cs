using Domain.Customers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IShoppingCartsRepository
    {
        public Task CreateShoppingCartAsync(ShoppingCart shoppingCart);
        public Task DeleteShoppingCartAsync(ShoppingCart shoppingCart);
        public Task UpdateShoppingCartAsync(ShoppingCart shoppingCart);
        public Task<ShoppingCart> FindProductAsync(Guid shoppingCartId);
    }
}
