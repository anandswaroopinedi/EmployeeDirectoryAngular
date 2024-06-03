//import { Status } from "../status/status";

import { Status } from "../status/status";

export interface Employee {
    profileImage:string,
    firstName:string,
    lastName:string,
    email:string,
    location:string,
    department:string,
    jobTitle:string,
    id:string,
    joinDate:Date,
    status:Status,
    managerId:string
}

// export class Employee
// {
//     firstName:string;
//     lastName:string;
//     email:string;
//     location:string;
//     department:string;
//     jobTitle:string;
//     id:string;
//     joinDate:Date;
//     status :Status;

//     constructor(employeeData:any={}){
//         this.firstName = employeeData.firstName,
//         this.lastName = employeeData.lastName,
//         this.id = employeeData.id,
//         this.department = employeeData.department,
//         this.jobTitle = employeeData.jobTitle,
//         this.email = employeeData.email,
//         this.location = employeeData.location,
//         this.joinDate = employeeData.joinDate,
//         this.status = employeeData.status
//     }
// }

