using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Products
{
    public class Equipment : Product
    {
        public Equipment(EquipmentType typeOfEquipment, string name, string description, string brand, float price, string img) : base(name, ProductCategory.Equipment, description, brand, price, img)
        {
            TypeOfEquipment = typeOfEquipment;

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


        public EquipmentType TypeOfEquipment{ get; set; }

        public enum EquipmentType
        {
            Dumbbells = 1,
            Kettlebells = 2,
            [Display(Name = "Gym Benches")] Gym_Benches = 3,
            [Display(Name = "Weight Racks")] Weight_Racks = 4,
            [Display(Name = "Pull Up and Push Up Bars")] Pull_Up_and_Push_Up_Bars = 5,
            [Display(Name = "Weight Lifting Belts and Gym Gloves")] Weight_Lifting_Belts_and_Gym_Gloves = 6,
            [Display(Name = "Weight Plates and Bars")] Weight_Plates_and_Bars = 7
        }
    }
}
