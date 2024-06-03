using AutoMapper;
using DataAccessLayer.Entities;
using Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace BusinessLogicLayer
{
    public class AutoMapperConfig:Profile
    {
        public AutoMapperConfig() 
        {
            CreateMap<Employee,EmployeeEntity>().ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status)).ReverseMap();
            CreateMap<Status, StatusEntity>().ReverseMap();
            CreateMap<Roles,RoleEntity>().ReverseMap();
            CreateMap<Department,DepartmentEntity>().ReverseMap();
            CreateMap<Location,LocationEntity>().ReverseMap();
            CreateMap<Project,ProjectEntity>().ReverseMap();
            CreateMap<Status,StatusEntity>().ReverseMap();
        }

    }
}
