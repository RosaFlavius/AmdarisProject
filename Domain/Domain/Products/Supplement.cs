using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public class Supplement : Product
    {
        public Supplement() : base()
        {
            Category = ProductCategory.Supplements;

        }

        public Supplement(SupplementType typeOfSupplement, string name, string description, string brand, float price, string img, bool inStock) : base(name, ProductCategory.Supplements, description, brand, price, img, inStock)
        {
            TypeOfSupplement = typeOfSupplement;
            if (string.IsNullOrEmpty(description))
                throw new ArgumentNullException("Null_description");

            if (string.IsNullOrEmpty(name))
                throw new ArgumentNullException("Null_name");

            if (string.IsNullOrEmpty(brand))
                throw new ArgumentNullException("Null_company");
            if (string.IsNullOrEmpty(img))
                throw new ArgumentNullException("Null_image");
            if (price <= 0)
                throw new ArgumentOutOfRangeException("Wrong_PriceRange");
           
            
        }

        public SupplementType TypeOfSupplement { get; set; }

        public enum SupplementType
        {
            Creatine = 1,
            Proteines = 2,
            [Display(Name = "Weight Gainers")] Weight_Gainers = 3,
            Vitamins = 4,
            [Display(Name = "Food and snacks")] Food_and_snacks = 5
        }
        
    }
}
