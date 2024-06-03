using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Interface;
using Microsoft.AspNetCore.Mvc;
using Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationManager _locationManager;
        public LocationController(ILocationManager locationManager)
        {
            _locationManager = locationManager;
        }

        // GET: api/<LocationController>
        [HttpGet]
        public async Task<IEnumerable<Location>> Get()
        {
            return await _locationManager.GetAll();
        }

        // POST api/<LocationController>
        [HttpPost]
        public void Post([FromBody] string name)
        {
            Location location = new Location();
            location.Name = name;
            _locationManager.AddLocation(location);
        }
    }
}
