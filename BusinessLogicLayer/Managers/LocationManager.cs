using DataAccessLayer.Interface;
using BusinessLogicLayer.Interfaces;
using Models;
using AutoMapper;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Managers
{
    public class LocationManager : ILocationManager
    {
        private readonly IDataOperations _dataOperations;
        private static string filePath = @"C:\Users\anand.i\source\repos\Employee Directory Console App\Data\Repository\Location.json";
        private readonly IMapper _mapper;
        public LocationManager(IDataOperations dataOperations,IMapper mapper)
        {
            _dataOperations = dataOperations;  
            _mapper = mapper;
        }

        public async Task<bool> AddLocation(Location location)
        {
            List<Location> locationList =GetAll().Result;

            if (!CheckLocationExists(location.Name, locationList))
            {
                locationList.Add(location);
                if(await _dataOperations.AddLocationToDb(_mapper.Map<LocationEntity>(location)))
                {
                    return true;
                }
            }
                return false;
        }

        public async Task<List<Location>> GetAll()
        {
            return _mapper.Map<List<Location>>( await _dataOperations.GetLocations());
        }
        public static bool CheckLocationExists(string loc, List<Location> locationList)
        {
            for (int i = 0; i < locationList.Count; i++)
            {
                if (locationList[i].Name == loc)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
