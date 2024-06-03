using DataAccessLayer.Interface;
using Models;
using BusinessLogicLayer.Interfaces;
using AutoMapper;
using DataAccessLayer.Entities;

namespace BusinessLogicLayer.Managers
{
    public class ProjectManager : IProjectManager
    {
        private readonly IDataOperations _dataOperations;
        private static string filePath = @"C:\Users\anand.i\source\repos\Employee Directory Console App\Data\Repository\Project.json";
        private readonly IMapper _mapper;
        public ProjectManager(IDataOperations dataOperations,IMapper mapper)
        {
            _dataOperations = dataOperations;
            _mapper = mapper;
        }

        public async Task<bool> AddProject(Project project)
        {
            List<Project> projectList = GetAll().Result;

            if (!CheckProjectExists(project.Name, projectList))
            {
                projectList.Add(project);
                if (await _dataOperations.AddProjectToDb(_mapper.Map<ProjectEntity>(project)))
                {
                    return true;
                }
            }
            return false;
        }

        public async Task<List<Project>> GetAll()
        {
            return _mapper.Map<List<Project>>( await _dataOperations.GetProjects());
        }
        public static bool CheckProjectExists(string project, List<Project> projectList)
        {
            for (int i = 0; i < projectList.Count; i++)
            {
                if (projectList[i].Name == project)
                {
                    return true;
                }
            }
            return false;
        }
    }
}
