using AutoMapper;
using BusinessLogicLayer.Interfaces;
using DataAccessLayer.Entities;
using DataAccessLayer.Interface;
using Models;

namespace BusinessLogicLayer.Managers
{
    public class RoleManager : IRoleManager
    {
        private readonly IDataOperations _dataOperations;
        private readonly IMapper _mapper;
        private static string filePath = @"C:\Users\anand.i\source\repos\Employee Directory Console App\Data\Repository\Role.json";
        public RoleManager(IDataOperations dataOperations,IMapper mapper)
        {
            _dataOperations = dataOperations;
            _mapper = mapper;
        }

        public async Task<bool> AddRole(Roles role)
        {
            if (await _dataOperations.AddRoleToDb(_mapper.Map<RoleEntity>( role)))
            {
                return true;
            }
            return false;
        }
        public async Task<bool> CheckRoleExists(string roleName)
        {
            List<Roles> roleList = await GetAll();
            for (int i = 0; i < roleList.Count; i++)
            {
                if (roleList[i].Name == roleName)
                {
                    return true;
                }
            }
            return false;
        }
        public async Task<List<Roles>> GetAll()
        {
            return _mapper.Map<List<Roles>>( await _dataOperations.GetRoles());
        }
        public async Task<string> GetRoleName(int id)
        {
            List<Roles> rolesList = await GetAll();
            for (int i = 0; i < rolesList.Count; i++)
            {
                if (rolesList[i].Id == id)
                {
                    return rolesList[i].Name;
                }
            }
            return "None";
        }
    }
}
