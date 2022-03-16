import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {count, map} from "rxjs";
import {KeyValue, KeyValuePipe} from "@angular/common";
import {Task} from "../task";
import {HistoricalTask} from "../historicalTask";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: String;

  constructor(private http: HttpClient,
              private keyValue: KeyValuePipe) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getUser(id: Number) {
    return this.http.get<User>(this.apiUrl + "/api/v1/user/info/" + id);
  }

  getUserTasks(id: Number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/getTasksOfUser/" + id);
  }

  getUserHistoricalTasks(id: Number) {
    return this.http.get<HistoricalTask[]>(this.apiUrl + "/api/v1/task/getHistoricalTasksOfUser/" + id);
  }

  getCountries() {
    return this.http.get<any>(this.apiUrl + "/api/v1/user/getCountries")
      .pipe(
        map(data => {
          return new Map(this.keyValue.transform<string, string>(data).map(element => [element.key, element.value]));
        })
      )
  }

  getUserTypes() {
    return this.http.get<string[]>(this.apiUrl + "/api/v1/user/getUserTypes")
  }

  public editUser(id: Number, user: User) {
    return this.http.post<any>(this.apiUrl + "/api/v1/user/edit/" + id, user);
  }

  addUserTokens(id: number, value: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/user/tokens/addUserTokens/" + id + "/" + value, null);
  }

  delUserTokens(id: number, value: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/user/tokens/delUserTokens/" + id + "/" + value, null);
  }

  addGroupTokens(id: number, value: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/user/tokens/addGroupTokens/" + id + "/" + value, null);
  }

  delGroupTokens(id: number, value: number) {
    return this.http.post<any>(this.apiUrl + "/api/v1/user/tokens/delGroupTokens/" + id + "/" + value, null);
  }
}
