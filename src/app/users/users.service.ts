import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {User} from "../user";
import {GlobalConstants} from "../common/global-constants";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  apiUrl: String;

  constructor(private http: HttpClient) {
    this.apiUrl = GlobalConstants.apiUrl;
  }

  getUser(id: Number) {
    return this.http.get<User>(this.apiUrl + "/api/v1/user/info/" + id);
  }

  getAllUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers");
  }

  getEssUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyEss=true");
  }

  getAlsimUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyAlsimCloud=true&onlyClient=true");
  }

  getDynairixUsers() {
    return this.http.get<User[]>(this.apiUrl + "/api/v1/user/getAllUsers?onlyDynairix=true&onlyClient=true");
  }


}
