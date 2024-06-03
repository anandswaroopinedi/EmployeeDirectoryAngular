using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;
using System.Diagnostics;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private IEmployeeManager _employeeManager;
        public EmployeeController(IEmployeeManager employeeManager) 
        {
            _employeeManager = employeeManager;
        }
        // GET: api/<ValuesController>
        [HttpGet("GetAllEmployees")]
        public async Task<IEnumerable<Employee>>GetAllEmployees()
        {
            List<Employee> e=await _employeeManager.GetAllEmployees();
            Console.WriteLine(e[0].Status.Id + e[0].Status.StatusName);
            return await _employeeManager.GetAllEmployees();
        }
        [HttpGet("GetAllIds")]
        public async Task<IEnumerable<string>> GetAllEmployeeIds()
        {

            return await _employeeManager.GetAllEmployeeIds();
        }

        // POST api/<ValuesController>
        [HttpPost]
        public async void AddEmployee(Employee employee)
        {
            await _employeeManager.Create(employee);
        }

/*        // PUT api/<ValuesController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {

        }*/

        [HttpDelete("DeleteEmployees")]
        public async Task<IEnumerable<Employee>> DeleteEmployees([FromBody] string[] ids)
        {
            Console.WriteLine(ids);
            if (ids.Length > 0)
            {
                await _employeeManager.DeleteEmployees(ids);
            } 
            return await _employeeManager.GetAllEmployees();
        }
        [HttpPost("FilterEmployees")]
        public async Task<IEnumerable<Employee>> ApplyFiltersOnEmployee( FilterEmployee inputFilters)
        {
            return await _employeeManager.ApplyFilter(inputFilters);
        }
        [HttpGet("Sorting")]
        public async Task<IEnumerable<Employee>> ApplySorting(string property,string order)
        {
           return await _employeeManager.ApplySorting(property, order);
        }
    }
}
