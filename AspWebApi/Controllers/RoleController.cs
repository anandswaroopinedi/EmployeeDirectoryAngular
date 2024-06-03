using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoleController : ControllerBase
    {
        private readonly IRoleManager _roleManager;
        public RoleController(IRoleManager roleManager) 
        {
            _roleManager = roleManager;
        }
        // GET: api/<RoleController>
        [HttpGet]
        public async Task< IEnumerable<Roles>> Get()
        {
            return await _roleManager.GetAll();
        }
        [HttpPost]
        public void Post(string rolename,string department, string Location,string Description)
        {
            Roles role=new Roles();
            role.Name = rolename;
            role.Department = department;
            role.Location = Location;
            role.Description = Description;
            _roleManager.AddRole(role);
        }

    }
}
