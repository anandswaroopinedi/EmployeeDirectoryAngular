using DataAccessLayer.Entities;
using DataAccessLayer.Interface;
using Microsoft.EntityFrameworkCore;
using Models;
using System.ComponentModel.Design;
using System.Data;
using System.Linq.Expressions;
using System.Net.NetworkInformation;
using System.Reflection;
using System.Text.Json;
using System.Xml;
namespace DataAccessLayer.Services
{
    public class DataOperations : DbContext, IDataOperations
    {
        private static String ConnectionString = "data source=SQL-DEV; database=AnandEmployeeDirectory; integrated security=SSPI;MultipleActiveResultSets=true; ENCRYPT=False";
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(ConnectionString);
        }
        public DbSet<EmployeeEntity> EmployeesDb { get; set; }
        public DbSet<RoleEntity> RolesDb { get; set; }
        public DbSet<DepartmentEntity> DepartmentDb { get; set; }
        public DbSet<ProjectEntity> ProjectDb { get; set; }
        public DbSet<LocationEntity> LocationDb { get; set; }
        public DbSet<StatusEntity> StatusDb { get; set; }


        public async Task<bool> AddEmployeeToDb(EmployeeEntity employee)
        {
            if (RolesDb.Where(r => r.Name == employee.JobTitle).Count() == 0)
            {
                RoleEntity roles = new RoleEntity();
                roles.Name = employee.JobTitle;
                roles.Department = employee.Department;
                roles.Location = employee.Location;
                roles.Description = "None";
                AddRoleToDb(roles);
            }
            if(ProjectDb.Where(p=>p.Name==employee.Project).Count()== 0)
            {
                ProjectEntity project = new ProjectEntity();
                project.Name = employee.Project;
                ProjectDb.Add(project);
            }
            if (StatusDb.Where(p => p.StatusName == employee.Status.StatusName).Count() == 0)
            {
                StatusEntity status = new StatusEntity();
                status.StatusName = employee.Status.StatusName;
                StatusDb.Add(status);
                SaveChanges();
                status = StatusDb.Where((p) => p.StatusName == employee.Status.StatusName).FirstOrDefault();
                employee.Status = status;
            }
           
            StatusEntity status1 = StatusDb.Where((p) => p.StatusName == employee.Status.StatusName).FirstOrDefault();
            status1.StatusName = status1.StatusName;
            employee.Status = status1;
            EmployeesDb.Add(employee);
            SaveChanges();
            return true;
        }
        public async Task<bool> AddDepartmentToDb(DepartmentEntity department)
        {
            DepartmentDb.Add(department);
            SaveChanges();
            return true;
        }
        public async Task<bool> AddProjectToDb(ProjectEntity project)
        {
            ProjectDb.Add(project);
            SaveChanges();
            return true;
        }
        public async Task<bool> AddLocationToDb(LocationEntity location)
        {
            LocationDb.Add(location);
            SaveChanges();
            return true;
        }
        public async Task<bool> AddRoleToDb(RoleEntity role)
        {
            if (DepartmentDb.Where(d => d.Name == role.Department).Count() == 0)
            {
                DepartmentEntity department = new DepartmentEntity();
                department.Name = role.Name;
                DepartmentDb.Add(department);
            }
            if (LocationDb.Where(l => l.Name == role.Location).Count() == 0)
            {
                LocationEntity location = new LocationEntity();
                location.Name = role.Location;
                LocationDb.Add(location);
            }
            RolesDb.Add(role);
            SaveChanges();
            return true;
        }
        public async Task<List<EmployeeEntity>> GetEmployees()
        {
            return await joinStatusNames(EmployeesDb);


        }
        public async Task<EmployeeEntity> GetEmployeeById(string Id)
        {
            return (from employee in EmployeesDb where employee.Id == Id select employee).ToList()[0];
        }
        public async Task<List<RoleEntity>> GetRoles()
        {
            return (from role in RolesDb select role).ToList();
        }
        public async Task<List<LocationEntity>> GetLocations()
        {
            return (from location in LocationDb select location).ToList();
        }
        public async Task<List<ProjectEntity>> GetProjects()
        {
            return (from project in ProjectDb select project).ToList();
        }
        public async Task<List<DepartmentEntity>> GetDepartments()
        {
            return (from department in DepartmentDb select department).ToList();
        }
        public async Task<bool> UpdateEmployee(EmployeeEntity employee)
        {
            EmployeeEntity e=EmployeesDb.Where(emp => emp.Id == employee.Id).FirstOrDefault();
            e = employee;
            try
            {
                SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                return false;
                // Provide for exceptions.
            }
            
        }
        public async Task<bool> DeleteEmployees(string [] ids)
        {

            for (int i = 0; i < ids.Length; i++)
            {
                Console.WriteLine(ids[0]);
                EmployeesDb.Remove((from emp in EmployeesDb where emp.Id == ids[i].ToUpper() select emp).FirstOrDefault());
            }
            SaveChanges();
            return true;
        }
        private async Task<List<EmployeeEntity>> joinStatusNames(IEnumerable<EmployeeEntity>employees)
        {
            return  (from employee in employees
                    join status in StatusDb on employee.Status equals status // Use status.Id for matching
                    select new EmployeeEntity
                    {
                        Id = employee.Id,
                        FirstName = employee.FirstName,
                        LastName = employee.LastName,
                        DateOfBirth = employee.DateOfBirth,
                        Email = employee.Email,
                        MobileNumber = employee.MobileNumber,
                        JoinDate = employee.JoinDate,
                        JobTitle = employee.JobTitle,
                        Location = employee.Location,
                        Department = employee.Department,
                        ManagerId = employee.ManagerId,
                        Project = employee.Project,
                        Status = status 
                    }).ToList();
        }
/*        public async Task<List<EmployeeEntity>> GetEmployeesFilteredByAlphabet(string alphabet)
        {
            if (alphabet == "$")
                return await joinStatusNames(EmployeesDb);
            return await joinStatusNames(EmployeesDb.Where(emp => emp.FirstName.StartsWith(alphabet.ToUpper())));
        }*/
        public async Task<List<string>> GetAllEmployeeIds()
        {
            return EmployeesDb.Select(emp=>emp.Id).ToList();
        }
        public async Task<List<EmployeeEntity>> ApplyFilters(FilterEmployee filterEmployee)
        {
            Console.WriteLine(filterEmployee.Alphabet);
            Console.WriteLine(filterEmployee.Departments.Length);
            Console.WriteLine(filterEmployee.Locations.Length);
            Console.WriteLine(filterEmployee.Statuses);
            //return EmployeeDb.Where(emp=>emp.FirstName.StartsWith(filterEmployee.alphabet.ToUpper())).Where(emp=>emp.Locations).ToList();
            return await joinStatusNames(EmployeesDb.Where(employee =>
        (filterEmployee.Alphabet == "$" || employee.FirstName.ToUpper().StartsWith(filterEmployee.Alphabet.ToUpper())) && 
        (filterEmployee.Locations.Length==0 || filterEmployee.Locations.Contains(LocationDb.Where(loc=>loc.Name==employee.Location.ToUpper()).Select(loc=>loc.Id).FirstOrDefault())) &&
        (filterEmployee.Departments.Length==0 || filterEmployee.Departments.Contains(DepartmentDb.Where(dep=>dep.Name==employee.Department.ToUpper()).Select(dep=>dep.Id).FirstOrDefault()))
        &&(filterEmployee.Statuses.Length==0 || filterEmployee.Statuses.Contains(employee.Status.Id))
        ));
        }
        public async Task<IEnumerable<EmployeeEntity>> ApplySorting(string property, string order)
        {
            if (!string.IsNullOrEmpty(property))
            {
                var propertyInfo = typeof(EmployeeEntity).GetProperty(property, BindingFlags.IgnoreCase | BindingFlags.Public | BindingFlags.Instance);
                if (propertyInfo != null)
                {
                    var parameter = Expression.Parameter(typeof(EmployeeEntity), "e");
                    var propertyAccessExpression = Expression.Property(parameter, propertyInfo);
                    var sortExpression = Expression.Lambda<Func<EmployeeEntity, object>>(propertyAccessExpression, parameter);

                    if (order.Equals("asc", StringComparison.OrdinalIgnoreCase))
                    {
                        return await joinStatusNames(EmployeesDb.OrderBy(sortExpression));
                    }
                    else if (order.Equals("desc", StringComparison.OrdinalIgnoreCase))
                    {
                        return await joinStatusNames(EmployeesDb.OrderByDescending(sortExpression));
                    }
                }
            }
            return [];
        }
        public async Task<IEnumerable<StatusEntity>> GetStatuses()
        {
            return StatusDb.ToList();
        }
    }
}

/*public class DataOperations : IDataOperations
{
    private String ConnectionString = "data source=SQL-DEV; database=ConsoleAppDB; integrated security=SSPI; ENCRYPT=False";
    public static void AddParameters(Employee employee, SqlCommand cmd)
    {
        cmd.CommandType = CommandType.StoredProcedure;
        cmd.Parameters.AddWithValue("@ID", employee.Id);
        cmd.Parameters.AddWithValue("@FirstName", employee.FirstName);
        cmd.Parameters.AddWithValue("@LastName", employee.LastName);
        if (!string.IsNullOrEmpty(employee.DateOfBirth))
            cmd.Parameters.AddWithValue("@DateOfBirth", DateTime.Parse(employee.DateOfBirth).Date);
        cmd.Parameters.AddWithValue("@JoiningDate", DateTime.Parse(employee.JoinDate).Date);
        cmd.Parameters.AddWithValue("@Email", employee.Email);
        if (!string.IsNullOrEmpty(employee.MobileNumber))
            cmd.Parameters.AddWithValue("@MobileNo", employee.MobileNumber);
        cmd.Parameters.AddWithValue("@Role", employee.JobTitle);
        cmd.Parameters.AddWithValue("@Location", employee.Location);
        cmd.Parameters.AddWithValue("@Department", employee.Department);
        if (!string.IsNullOrEmpty(employee.ManagerId))
            cmd.Parameters.AddWithValue("@ManagerID", employee.ManagerId);
        cmd.Parameters.AddWithValue("@Project", employee.Project);
    }
    public async Task<bool> AddEmployeeToDb(Employee employee)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspInsertEmployee", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                AddParameters(employee, cmd);
                await Task.FromResult(cmd.ExecuteNonQuery());
                return true;
            }

        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in creating an employee.\n" + e);
            return false;
        }
    }
    public async Task<bool> AddDepartmentToDb(Department department)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspInsertDepartment", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", department.Name);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in creating an department.\n" + e);
            return false;
        }
    }
    public async Task<bool> AddProjectToDb(Project project)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspInsertProject", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", project.Name);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in creating an project.\n" + e);
            return false;
        }
    }
    public async Task<bool> AddLocationToDb(Location location)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspInsertLocation", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", location.Name);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in creating an location.\n" + e);
            return false;
        }
    }
    public async Task<bool> AddRoleToDb(Roles role)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspInsertRole", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@Name", role.Name);
                if (role.Description != null)
                    cmd.Parameters.AddWithValue("@Description", role.Description);
                cmd.Parameters.AddWithValue("@Department", role.Department);
                cmd.Parameters.AddWithValue("@Location", role.Location);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in creating an role.\n" + e);
            return false;
        }
    }
    public async Task<Employee> GetEmployeeById(string Id)
    {
        Employee employee = new Employee();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectOneEmployee", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", Id);
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    mapEmployeeReaderObjects(employee, reader);
                }
                return employee;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving an employee.\n" + e);
            return employee;
        }
    }
    public static void mapEmployeeReaderObjects(Employee employee, SqlDataReader reader)
    {
        employee.Id = Convert.ToString(reader[0]);
        employee.FirstName = Convert.ToString(reader[1]);
        employee.LastName = Convert.ToString(reader[2]);
        employee.DateOfBirth = Convert.ToString(reader[3]);
        if (string.IsNullOrEmpty(employee.DateOfBirth))
            employee.DateOfBirth = "None";
        employee.Email = Convert.ToString(reader[4]);
        employee.MobileNumber = Convert.ToString(reader[5]);
        if (string.IsNullOrEmpty(employee.MobileNumber))
            employee.MobileNumber = "None";
        employee.JoinDate = Convert.ToString(reader[6]).Substring(0, 10);
        employee.JobTitle = Convert.ToString(reader[7]);
        employee.Location = Convert.ToString(reader[8]);
        employee.Department = Convert.ToString(reader[9]);
        employee.ManagerId = Convert.ToString(reader[10]);
        employee.Project = Convert.ToString(reader[11]);
    }
    public async Task<List<Employee>> GetEmployees()
    {
        List<Employee> Employees = new List<Employee>();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectAllEmployees", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Employee employee = new Employee();
                    mapEmployeeReaderObjects(employee, reader);
                    Employees.Add(employee);
                }
                return Employees;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving employees.\n" + e);
            return Employees;
        }
    }
    public async Task<List<Department>> GetDepartments()
    {
        List<Department> departments = new List<Department>();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectAllDepartments", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Department dept = new Department();
                    dept.Id = Convert.ToInt32(reader[0]);
                    dept.Name = Convert.ToString(reader[1]);
                    departments.Add(dept);
                }
                return departments;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving an Department.\n" + e);
            return departments;
        }
    }
    public async Task<List<Project>> GetProjects()
    {
        List<Project> projects = new List<Project>();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectAllProjects", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Project p = new Project();
                    p.Id = Convert.ToInt32(reader[0]);
                    p.Name = Convert.ToString(reader[1]);
                    projects.Add(p);
                }
                return projects;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving an Projects.\n" + e);
            return projects;
        }
    }
    public async Task<List<Location>> GetLocations()
    {
        List<Location> locations = new List<Location>();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectAllLocations", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Location location = new Location();
                    location.Id = Convert.ToInt32(reader[0]);
                    location.Name = Convert.ToString(reader[1]);
                    locations.Add(location);
                }
                return locations;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving an Location.\n" + e);
            return locations;
        }
    }
    public async Task<List<Roles>> GetRoles()
    {
        List<Roles> roles = new List<Roles>();
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspSelectAllRoles", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                SqlDataReader reader = cmd.ExecuteReader();
                while (reader.Read())
                {
                    Roles role = new Roles();
                    role.Id = Convert.ToInt32(reader[0]);
                    role.Name = Convert.ToString(reader[1]);
                    role.Department = Convert.ToString(reader[2]);
                    role.Location = Convert.ToString(reader[3]);
                    if (string.IsNullOrEmpty(Convert.ToString(reader[4])))
                    {
                        role.Description = null;
                    }
                    else
                    {
                        role.Description = Convert.ToString(reader[4]);
                    }
                    role.Description = Convert.ToString(reader[4]);
                    if (string.IsNullOrEmpty(role.Description))
                        role.Description = "None";
                    roles.Add(role);
                }
                return roles;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in retrieving an role.\n" + e);
            return roles;
        }
    }
    public async Task<bool> DeleteEmployee(string id)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspDeleteEmployeeById", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ID", id);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in deleting an employee.\n" + e);
            return false;
        }
    }
    public async Task<bool> UpdateEmployee(Employee employee)
    {
        try
        {
            using (SqlConnection conn = new SqlConnection(ConnectionString))
            {
                conn.Open();
                SqlCommand cmd = new SqlCommand("uspUpdateEmployee", conn);
                cmd.CommandType = CommandType.StoredProcedure;
                AddParameters(employee, cmd);
                cmd.ExecuteNonQuery();
                return true;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine("OOPs, something went wrong in updating an employee.\n" + e);
            return false;
        }
    }

    public async Task<List<T>> Read<T>(string filePath)
    {
        try
        {
            using (StreamReader reader = new StreamReader(filePath))
            {
                string jsonData = await reader.ReadToEndAsync();
                if (!string.IsNullOrEmpty(jsonData))
                {
                    return JsonSerializer.Deserialize<List<T>>(jsonData);
                }
            }
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error writing project data: {ex.Message}");
        }
        return new List<T>();
    }
    public async Task<bool> Write<T>(List<T> t, string filePath)
    {
        try
        {
            string jsonData = JsonSerializer.Serialize(t, new JsonSerializerOptions
            {
                WriteIndented = true // Optional: Format the JSON for better readability
            });
            await File.WriteAllTextAsync(filePath, jsonData);
            return true;
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Error writing project data: {ex.Message}");
            return false;
        }
    }*/

