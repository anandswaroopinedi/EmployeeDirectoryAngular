// export interface FilterData{
//     Alphabet:string;
//     Statuses:number[];
//     Departments:number[];
//     Locations:number[];
// }
export class FilterData {
  Alphabet: string;
  Statuses: number[];
  Departments: number[];
  Locations: number[];
  constructor() {
    this.Alphabet = '';
    this.Statuses = [];
    this.Departments = [];
    this.Locations = [];
  }
}
