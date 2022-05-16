using Domain.Products;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.RepositoryPattern
{
    public interface IEquipmentRepository
    {
        public void AddEquipment(Equipment equipment);
        public bool DeleteEquipment(Guid equipmentId);
        public Equipment UpdateEquipment(Equipment equipment);
        public Task<Equipment> GetEquipment(Guid equipmentId);
        public Task<IEnumerable<Equipment>> GetAllEquipment();
        public Task<int> SaveChangesAsync();


    }
}
