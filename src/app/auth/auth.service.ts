import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {GlobalConstants} from "../common/global-constants";
import {shareReplay, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(password: string) {
    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + password)
    });

    return this.http.get<Message>(GlobalConstants.apiUrl + '/api/v1/token/generate', {headers: headers})
      .pipe(shareReplay())
      .pipe(tap((message: Message) => {
        this.setSession(message.message)
      }))
  }

  private setSession(token: string) {
    localStorage.setItem('token', token)
    console.log(token)
  }

  logout() {
    localStorage.removeItem('token')
  }

  isLoggedIn() {
  }

  isLoggedOut() {
  }

  getExpiration() {

  }
}
