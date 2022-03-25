import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  findTasksByUserId(id: number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?userId=" + id)
  }

  findTasksByGroupId(id: number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?groupId=" + id)
  }

  findTasksBySchemaId(id: number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?schemaId=" + id)
  }

  findTasksByStatus(status: string) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks?status=" + status)
  }

  getAllTasks() {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/findTasks")
  }

}
