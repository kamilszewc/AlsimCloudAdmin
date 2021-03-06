import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Message} from "../message";
import {GlobalConstants} from "../common/global-constants";
import {interval, Observable, shareReplay, Subscription, tap} from "rxjs";
import jwtDecode from "jwt-decode";
import {Router} from "@angular/router";

class Token {
  role: string
  twoFA: boolean

  constructor(role: string, twoFA: boolean) {
    this.role = role
    this.twoFA = twoFA
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  expirationTime = 1800

  isAutomaticTokenRegeneration = false;
  tokenRegeneration: Subscription | undefined;

  // isUsing2FA = false;

  constructor(private http: HttpClient,
              private router: Router) { }

  basicLogin(user: string, password: string, code: string) {

    let headers = new HttpHeaders({
      authorization: 'Basic ' + btoa(user + ':' + password),
      code: code
    });

    return this.generateToken(headers)
  }

  tokenLogin(token: string) {

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

  hasTwoFaEnabled() {
    if (localStorage.getItem('token') != null) {
      let decodedToken: Token = jwtDecode(localStorage.getItem('token')!);
      return decodedToken.twoFA;
    }
    return false;
    // return this.http.get<Message<boolean>>(GlobalConstants.apiUrl + "/api/v1/user/isUsing2FA/" + username)
    //   .pipe(tap((message: Message<boolean>) => {
    //     this.isUsing2FA = message.message;
    //   }))
  }

  private getNow() {
    return Math.floor(Date.now()/1000);
  }
}
