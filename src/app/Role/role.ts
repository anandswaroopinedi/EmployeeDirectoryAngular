import { Department } from '../Department/department';

export interface Role {
  id: number | null;
  name: string;
  departmentid: number;
  departmentName: string;
  locationId: number;
  locationName: string;
  description: string;
  roleDeptLocId: number;
}
