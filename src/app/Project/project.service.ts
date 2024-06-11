import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';
import { WebApiUrls } from '../webapi-urls';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrls: WebApiUrls = new WebApiUrls();
  constructor(private http: HttpClient) {}
  getProjects() {
    return this.http.get<Project[]>(this.apiUrls.projects);
  }
}
