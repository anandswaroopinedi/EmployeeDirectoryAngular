export class WebApiUrls {
  addEmployee: string;
  getAllEmployees: string;
  deleteEmployees: string;
  updateEmployee: string;
  getAllIds: string;
  filterEmployees: string;
  sorting: string;
  getEmployeeById: string;
  filterRoles: string;
  getRoles: string;
  getEmployeesWithRolenull: string;
  postRole: string;
  getEmployeeByRoleId: string;
  locations: string;
  departments: string;
  projects: string;
  statuses: string;
  constructor() {
    this.addEmployee = 'https://localhost:7270/api/Employee/create';
    this.getAllEmployees =
      'https://localhost:7270/api/Employee/all';
    this.deleteEmployees =
      'https://localhost:7270/api/Employee/multi-delete';
    this.updateEmployee = 'https://localhost:7270/api/Employee/update';
    this.getAllIds = 'https://localhost:7270/api/Employee/ids';
    this.filterEmployees =
      'https://localhost:7270/api/Employee/filter';
    this.sorting = 'https://localhost:7270/api/Employee/sort';
    this.getEmployeeById =
      'https://localhost:7270/api/Employee/fetch-through-id?id=';
    this.filterRoles = 'https://localhost:7270/api/Role/filter';
    this.getRoles = 'https://localhost:7270/api/Role/all';
    this.getEmployeesWithRolenull =
      'https://localhost:7270/api/Employee/with-role-null?name=';
    this.postRole = 'https://localhost:7270/api/Role/create';
    this.getEmployeeByRoleId =
      'https://localhost:7270/api/Employee/fetch-through-roleid?id=';
    this.locations = 'https://localhost:7270/api/Location/all';
    this.departments = 'https://localhost:7270/api/Department/all';
    this.projects = 'https://localhost:7270/api/Project/all';
    this.statuses = 'https://localhost:7270/all';
  }
}
