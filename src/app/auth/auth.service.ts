import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {GlobalConstants} from "../common/global-constants";
import {interval, Observable, shareReplay, Subscription, tap} from "rxjs";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

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

  isAutomaticTokenRegeneration = false;
  tokenRegeneration: Subscription | undefined;

  constructor(private http: HttpClient,
              private router: Router) { }

  basicLogin(password: string) {
    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa("admin" + ':' + password)
    });

    return this.generateToken(headers)
  }

  tokenLogin(token: string) {
    console.log(token)

    let headers = new HttpHeaders({
      authorization: 'Bearer ' + token
    });

    return this.generateToken(headers)
  }

  generateToken(headers: HttpHeaders) {
    return this.http.get<Message<string>>(GlobalConstants.apiUrl + '/api/v1/token/generate', {headers: headers})
      .pipe(shareReplay())
      .pipe(tap((message: Message<string>) => {
        this.setSession(message.message)
      }))
  }

  regenerateToken() {
    if (this.isAutomaticTokenRegeneration == false) {
      this.isAutomaticTokenRegeneration = true;
      this.tokenRegeneration = interval(60000).subscribe(value => {

        if (localStorage.getItem('token') != null) {
          const token = localStorage.getItem('token')
          this.tokenLogin(token!).subscribe(
            message => {
            },
            error => {
              this.logout();
            })
        }
      })
    }
  }

  private setSession(token: string) {
    let decodedToken: Token = jwtDecode(token);

    localStorage.setItem('token', token)
    localStorage.setItem('role', decodedToken.role)
    localStorage.setItem('expiration', (this.getNow() + this.expirationTime).toString())
  }

  logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('expiration')

    this.isAutomaticTokenRegeneration = false;
    this.tokenRegeneration!.unsubscribe();

    this.router.navigate(['login'])
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
