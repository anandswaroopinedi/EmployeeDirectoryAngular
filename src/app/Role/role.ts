import { Department } from "../Department/department";

export interface Role{
    id:number;
    name:string;
    department:Department;
    location:Location;
    description:string;
}