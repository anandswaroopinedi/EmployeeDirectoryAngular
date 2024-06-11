import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Status } from './status';
import { Observable } from 'rxjs';
import { WebApiUrls } from '../webapi-urls';

@Injectable({
  providedIn: 'root',
})
export class StatusService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  constructor(private http: HttpClient) {}
  getStatuses(): Observable<Status[]> {
    return this.http.get<Status[]>(this.apiUrls.statuses);
  }
}
