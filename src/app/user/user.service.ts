import { Injectable } from '@angular/core';
import {User} from "../user";
import {HttpClient} from "@angular/common/http";
import {GlobalConstants} from "../common/global-constants";
import {count, map} from "rxjs";
import {KeyValue, KeyValuePipe} from "@angular/common";

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
}
