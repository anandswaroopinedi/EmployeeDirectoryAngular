//import { Status } from "../status/status";

import { Status } from '../status/status';

export interface Employee {
  dateOfBirth: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  email: string;
  departmentId: number;
  departmentName: string;
  locationId: number;
  locationName: string;
  jobTitleId: number;
  jobTitleName: string;
  id: string;
  joinDate: string;
  statusId: number;
  statusName: string;
  managerId: string;
  projectId: number;
  mobileNo: string;
}

// export class Employee
// {
//     profileImage:string;
//     firstName:string;
//     lastName:string;
//     email:string;
//     departmentid:number;
//     departmentName:string;
//     locationId:number;
//     locationName:string;
//     jobTitleId:number;
//     jobTitle:string;
//     id:string;
//     joinDate:string;
//     statusId:number;
//     statusId:Status;
//     managerId:string

//     constructor(employeeData:any={}){
//         this.firstName = employeeData.firstName,
//         this.lastName = employeeData.lastName,
//         this.id = employeeData.id,
//         this.profileImage=employeeData.profileImage,
//         this.departmentId = employeeData.departmentId,
//         this.jobTitleId = employeeData.jobTitle,
//         this.email = employeeData.email,
//         this.locationId = employeeData.location,
//         this.joinDate = employeeData.joinDate,
//         this.statusId = employeeData.statusId,
//         this.managerId=employeeData.managerId;
//     }
// }
