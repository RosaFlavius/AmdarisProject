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
        public Supplement(SupplementType typeOfSupplement, string name, string description, string brand, float price) : base(name, Category.Supplements, description, brand, price)
        {
            TypeOfSupplement = typeOfSupplement;
        }

        public Supplement()
        {

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
