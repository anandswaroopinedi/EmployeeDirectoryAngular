import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';
@Injectable({
  providedIn: 'root'
})
export class LocationService {
  constructor(private http:HttpClient) { }
  getLocations():Observable<Location[]>{
    return this.http.get<Location[]>(`https://localhost:7270/api/Location`);
  }
}
