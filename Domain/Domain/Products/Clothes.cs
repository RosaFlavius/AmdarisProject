using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public class Clothes : Product
    {
        

        public Clothes(ClothesSize size, ClothesGender gender, string name, string description, string brand, float price) : base(name, Category.Clothes, description, brand, price)
        {
            
            Size = size;
            Gender = gender;

        }

        public Clothes() : base()
        {
        }

        public ClothesSize Size { get; set; }
        public ClothesGender Gender { get; set; }

        public enum ClothesSize
        {
            XS = 1,
            S = 2,
            M = 3,
            L = 4,
            XL = 5,
            XXL = 6
        }

        public enum ClothesGender
        {
            Men = 1,
            Woman = 2,
            Kids = 3
        }
    }


}
