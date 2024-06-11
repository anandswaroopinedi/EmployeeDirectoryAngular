import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Location } from './location';
import { WebApiUrls } from '../webapi-urls';
@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  constructor(private http: HttpClient) {}
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(this.apiUrls.locations);
  }
}
