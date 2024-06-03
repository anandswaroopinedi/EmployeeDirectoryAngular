using Models;

namespace BusinessLogicLayer.Interfaces
{
    public interface IEmployeeManager
    {
        public Task<bool> Create(Employee employee);
        public Task<bool> Update(Employee employee);
        public Task<bool> DeleteEmployees(string[] ids);
        public Task<int> CheckIdExists(string id);
        public Task<Employee> GetSingleEmployee(string id);
        public Task<List<Employee>> GetAllEmployees();
        public Task<List<string>> GetAllEmployeeIds();
        public Task<List<Employee>> ApplyFilter(FilterEmployee filterEmployee);
        public Task<IEnumerable<Employee>> ApplySorting(string property, string order);
    }
}
