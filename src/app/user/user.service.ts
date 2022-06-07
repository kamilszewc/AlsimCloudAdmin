import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {count, map} from "rxjs";
import {KeyValue, KeyValuePipe} from "@angular/common";
import {Task} from "../task";
import {HistoricalTask} from "../historicalTask";
import {Message} from "../message";
import {Group} from "../group";
import {UserSchemaInfo} from "../schema";
import {ErrorCode} from "@angular/compiler-cli/src/ngtsc/diagnostics";


export interface ECubes {
  id: string | null;
  amount: number | null;
  startTime: string | null;
  expirationTime: string | null;
};

export interface ECubesCreation {
  amount: number | null;
  numberOfDays: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl: String;

  constructor(private http: HttpClient,
              private keyValue: KeyValuePipe) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getUser(id: number) {
    return this.http.get<User>(this.apiUrl + "/api/v1/user/info/" + id);
  }

  getUserTasks(id: Number) {
    return this.http.get<Task[]>(this.apiUrl + "/api/v1/task/getTasksOfUser/" + id);
  }

  getUserHistoricalTasks(id: Number) {
    return this.http.get<HistoricalTask[]>(this.apiUrl + "/api/v1/task/getHistoricalTasksOfUser/" + id);
  }

  getCountries() {
    //return this.http.get<Map<string, string>>(this.apiUrl + "/api/v1/user/getCountriesList")
    return this.http.get<any>(this.apiUrl + "/api/v1/user/getCountries")
      .pipe(
        map(data => {
          return new Map(this.keyValue.transform<string, string>(data).map(element => [element.value, element.key]));
        })
      )
  }

  getAllGroups() {
    return this.http.get<Group[]>(this.apiUrl + "/api/v1/group/getAllGroups");
  }

  getUserTypes() {
    return this.http.get<string[]>(this.apiUrl + "/api/v1/user/getUserTypes")
  }

  public editUser(id: Number, user: User) {
    return this.http.post<User>(this.apiUrl + "/api/v1/user/edit/" + id, user);
  }

  deleteUser(id: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/user/remove/" + id);
  }

  getUserSchemas(id: number) {
    return this.http.get<UserSchemaInfo>(this.apiUrl + "/api/v1/schema/getUserSchemaInfo/" + id);
  }

  allowSchema(userId: number, schemaId: number) {
    return this.http.post<Message<string>>(this.apiUrl + "/api/v1/schema/allow/" + schemaId + "/" + userId, null);
  }

  disallowSchema(userId: number, schemaId: number) {
    return this.http.post<Message<string>>(this.apiUrl + "/api/v1/schema/disallow/" + schemaId + "/" + userId, null);
  }

  getECubes(userId: number) {
    return this.http.get<ECubes[]>(this.apiUrl + "/api/v1/userECubes/getUserECubes/" + userId);
  }

  addECubes(ecubes: ECubesCreation, userId: number) {
    return this.http.post<ECubes>(this.apiUrl + "/api/v1/userECubes/new/" + userId, ecubes);
  }

  removeECubes(poolId: number) {
    return this.http.delete<Message<string>>(this.apiUrl + "/api/v1/userECubes/remove/" + poolId);
  }
}
