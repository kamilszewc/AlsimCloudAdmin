import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {GlobalConstants} from "../common/global-constants";
import {shareReplay, tap} from "rxjs";
import jwtDecode from "jwt-decode";

class Token {
  role: string

  constructor(role: string) {
    this.role = role
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  expirationTime = 1800

  constructor(private http: HttpClient) { }

  login(password: string) {
    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + password)
    });

    return this.http.get<Message<string>>(GlobalConstants.apiUrl + '/api/v1/token/generate', {headers: headers})
      .pipe(shareReplay())
      .pipe(tap((message: Message<string>) => {
        this.setSession(message.message)
      }))
  }

  private setSession(token: string) {
    let decodedToken: Token = jwtDecode(token);
    console.log(decodedToken)

    localStorage.setItem('token', token)
    localStorage.setItem('role', decodedToken.role)
    localStorage.setItem('expiration', (this.getNow() + this.expirationTime).toString())
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('expiration')
  }

  isLoggedIn() {
    if (localStorage.getItem('token') != null) {
      let expirationTime = new Number(localStorage.getItem('expiration'));
      if (this.getNow() < expirationTime) {
        if (localStorage.getItem('role') === 'ROLE_ADMIN') {
          return true;
        }
      }
    }
    return false;
  }

  isLoggedOut() {
    return !this.isLoggedIn()
  }

  private getNow() {
    return Math.floor(Date.now()/1000);
  }
}
