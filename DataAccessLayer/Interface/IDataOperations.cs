using DataAccessLayer.Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccessLayer.Interface
{
    public interface IDataOperations
    {
        public  Task<bool> AddEmployeeToDb(EmployeeEntity emp);
        public Task<bool> AddRoleToDb(RoleEntity role);
        public Task<bool> AddLocationToDb(LocationEntity location);
        public Task<bool> AddProjectToDb(ProjectEntity project);
        public Task<bool> AddDepartmentToDb(DepartmentEntity department);
        public Task<List<EmployeeEntity>> GetEmployees();
        public Task<EmployeeEntity> GetEmployeeById(string id);
        public Task<List<RoleEntity>> GetRoles();
        public Task<List<LocationEntity>> GetLocations();
        public Task<List<ProjectEntity>> GetProjects();
        public Task<List<DepartmentEntity>> GetDepartments();
        public Task<bool> DeleteEmployees(string [] id);
        public Task<bool> UpdateEmployee(EmployeeEntity employee);
        public Task<List<string>> GetAllEmployeeIds();
        public Task<List<EmployeeEntity>> ApplyFilters(FilterEmployee filterEmployee);
        public Task<IEnumerable<EmployeeEntity>> ApplySorting(string property, string order);
        public Task<IEnumerable<StatusEntity>> GetStatuses();
/*        public Task<List<T>> Read<T>(string filePath);
        public Task<bool> Write<T>(List<T> t, string filePath);*/

    }
}
