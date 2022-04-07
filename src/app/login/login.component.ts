import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validator, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {finalize, interval} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  @ViewChild('loginForm') loginForm!: NgForm;
  loginComponents = new class {
    username: string = "";
    password: string = "";
    code: string = "";
  }
  @ViewChild('wrongCredentialAlert') wrongCredentialAlert!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {
  }

  login() {
    const val = this.loginComponents;

    if (val.username && val.password) {

          this.authService.basicLogin(val.username, val.password, val.code)
            .pipe(
              finalize(() => {
                if (this.authService.isLoggedOut()) {
                  this.wrongCredentialAlert.nativeElement.hidden = false;
                }
              })
            )
            .subscribe(
              () => {
                console.log("User is logged in");

                this.authService.regenerateToken();

                if (this.authService.hasTwoFaEnabled()) {
                  this.router.navigateByUrl('')
                } else {
                  this.router.navigateByUrl('twoFA')
                }
              }
            );
    }
  }

  hideAlert() {
    this.wrongCredentialAlert.nativeElement.hidden = true;
  }
}
