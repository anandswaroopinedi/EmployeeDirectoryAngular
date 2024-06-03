using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DepartmentController : ControllerBase
    {
        private readonly IDepartmentManager _departmentManager;
        public DepartmentController(IDepartmentManager departmentManager)
        {
            _departmentManager = departmentManager;
        }
        // GET: api/<DepartmentController>
        [HttpGet]
        public async Task<IEnumerable<Department>> Get()
        {
            return await _departmentManager.GetAll();
        }

        // POST api/<DepartmentController>
        [HttpPost]
        public void Post([FromBody] string name)
        {
            Department department=new Department();
            department.Name = name;
            _departmentManager.AddDepartment(department);
        }
    }
}
