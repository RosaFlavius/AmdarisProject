using Domain.Products;
using Domain.RepositoryPattern;
using Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Repositories
{
    public class EquipmentRepository : IEquipmentRepository
    {
        private readonly DataDbContext _dbContext;

        public EquipmentRepository(DataDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void AddEquipment(Equipment equipment)
        {
            _dbContext.Add(equipment);
        }

        public bool DeleteEquipment(Guid id)
        {
            var equipment = _dbContext.Equipments.FirstOrDefault(item => item.Id == id);
            if (equipment != null)
            {
                _dbContext.Remove(equipment);
                return true;
            }
            return false;
        }

        public Equipment UpdateEquipment(Equipment item)
        {
            var equipment = _dbContext.Equipments.FirstOrDefault(i => i.Id == item.Id);
            equipment = item;
            return equipment;
        }

        public async Task<Equipment> GetEquipment(Guid id)
        {
            var equipment = await _dbContext.Equipments.FirstOrDefaultAsync(item => item.Id == id);

            if (equipment != null)
            {
                return equipment;
            }
            throw new ApplicationException($"Equipment with id: {id} does not exist");

        }

        public async Task<IEnumerable<Equipment>> GetAllEquipment()
        {
            return _dbContext.Equipments;
        }

        public async Task<int> SaveChangesAsync()
        {

            return await _dbContext.SaveChangesAsync();
        }
    }
}
