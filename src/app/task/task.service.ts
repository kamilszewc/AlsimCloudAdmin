import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {Task} from "../task"

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getTask(id: number) {
    return this.http.get<Task>(this.apiUrl + "/api/v1/task/info/" + id);
  }

  editTask(id: number, task: Task) {
    return this.http.post<Task>(this.apiUrl + "/api/v1/task/edit/" + id, task);
  }

}
