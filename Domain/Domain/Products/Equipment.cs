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
        public Equipment(EquipmentType typeOfEquipment, string name, string description, string brand, float price) : base(name, Category.Equipment, description, brand, price)
        {

            TypeOfEquipment = typeOfEquipment;
            
        }

        public Equipment() : base()
        {

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
