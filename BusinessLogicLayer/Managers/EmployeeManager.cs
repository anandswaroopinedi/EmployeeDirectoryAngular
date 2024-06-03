using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interface;
using Models;


namespace BusinessLogicLayer.Managers
{
    public class EmployeeManager : IEmployeeManager
    {
        private readonly IDataOperations _dataOperations;
        private readonly IMapper _mapper;
        private static string filePath=@"C:\Users\anand.i\source\repos\Employee Directory Console App\Data\Repository\Employee.json";
        public EmployeeManager( IDataOperations dataOperations,IMapper mapper)
        {
            _dataOperations = dataOperations;
            _mapper = mapper;
        }
        public async Task<bool> Create(Employee employee)
        {
            if (await _dataOperations.AddEmployeeToDb(_mapper.Map<EmployeeEntity>(employee)))
            {
                return true;
            }
            return false;
        }
        public async Task<bool> Update(Employee employee)
        {
            if (await _dataOperations.UpdateEmployee(_mapper.Map<EmployeeEntity>(employee)))
            {
                return true;
            }
            return false;
        }
        public async Task<bool> DeleteEmployees(string [] ids)
        {
                if(await _dataOperations.DeleteEmployees(ids))
                {
                    return true;
                }
                return false;  
        }
        public async Task<int> CheckIdExists(string id)
        {
            List<Employee> employeeList = await GetAllEmployees();
            for (int i = 0; i < employeeList.Count; i++)
            {
                if (employeeList[i].Id == id)
                    return i;
            }
            return -1;
        }
        public async Task<List<Employee>> GetAllEmployees()
        {
            return _mapper.Map<List<Employee>>( await _dataOperations.GetEmployees());
        }
        public async Task<Employee> GetSingleEmployee(string  id)
        {
            return _mapper.Map<Employee>(await _dataOperations.GetEmployeeById(id));
        }

        public async Task<List<string>> GetAllEmployeeIds()
        {
            return await _dataOperations.GetAllEmployeeIds();
        }
        public async Task<List<Employee>> ApplyFilter(FilterEmployee filterEmployee)
        {
            return _mapper.Map<List<Employee>>(await _dataOperations.ApplyFilters(filterEmployee));
        }
        public async Task<IEnumerable<Employee>> ApplySorting(string property, string order)
        {
            return  _mapper.Map<List<Employee>>(await _dataOperations.ApplySorting(property, order));
        }

    }

}
