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

      this.authService.hasTwoFaEnabled(val.username)
        // .pipe(
        //   finalize(() => {
        //       this.wrongCredentialAlert.nativeElement.hidden = false;
        //   })
        // )
        .subscribe(
          message => {
          console.log("Is using: " + message.message);

          if (message.message == null) {
            this.wrongCredentialAlert.nativeElement.hidden = false;
          }

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

                if (message.message == true) {
                  this.router.navigateByUrl('');
                } else {
                  console.log("routing here")
                  this.router.navigateByUrl('twoFA');
                }
              }
            );
          },
          error => {
            this.wrongCredentialAlert.nativeElement.hidden = false;
          }
      )

    }
  }

  hideAlert() {
    this.wrongCredentialAlert.nativeElement.hidden = true;
  }
}
