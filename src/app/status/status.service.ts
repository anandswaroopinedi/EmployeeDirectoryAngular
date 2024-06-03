import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from './status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http:HttpClient) {
  }
  getStatuses():Observable<Status[]>
  {
    return this.http.get<Status[]>(`https://localhost:7262/GetAllStatuses`);
  }
   
}
