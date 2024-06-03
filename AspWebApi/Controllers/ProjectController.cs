using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectManager _projectManager;
        public ProjectController(IProjectManager projectManager)
        {
            _projectManager = projectManager;
        }
        // GET: api/<ProjectController>
        [HttpGet]
        public async  Task<IEnumerable<Project>> Get()
        {
            return await _projectManager.GetAll();
        }


        // POST api/<ProjectController>
        [HttpPost]
        public void Post([FromBody] string name)
        {
            Project project=new Project();
            project.Name = name;
            _projectManager.AddProject(project);
        }
    }
}
