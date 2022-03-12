import { Injectable } from '@angular/core';
import {GlobalConstants} from "../../../../AlsimCloudAdmin/src/app/common/global-constants";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getUser(id: Number) {
    return this.http.get<User>(this.apiUrl + "/api/v1/user/info/" + id, {headers: GlobalConstants.headers});
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers", {headers: GlobalConstants.headers});
  }

  getEssUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyEss=true", {headers: GlobalConstants.headers});
  }

  getAlsimUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyAlsimCloud=true", {headers: GlobalConstants.headers});
  }

  getDynairixUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyDynairix=true", {headers: GlobalConstants.headers});
  }
}
