import { Injectable } from '@angular/core';
import { Project } from './project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  constructor(private http:HttpClient) { 
  }
  getProjects()
  {
    return this.http.get<Project[]>(`https://localhost:7270/api/Project`);
  }
  }
