import { Injectable } from '@angular/core';
import {GlobalConstants} from "../common/global-constants";
import {HttpClient} from "@angular/common/http";
import {Task} from "../task"
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

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

  stopTask(id: number, message: string) {
    return this.http.post<Message>(this.apiUrl + "/api/v1/task/stopTask/" + id + "?message=" + message, null);
  }

}
