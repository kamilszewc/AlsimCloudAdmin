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
  }
  @ViewChild('wrongCredentialAlert') wrongCredentialAlert!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    // this.loginForm = this.formBuilder.group({
    //   username: ['', Validators.required],
    //   password: ['', Validators.required]
    // })
  }

  login() {
    const val = this.loginComponents;

    console.log(val)

    if (val.username && val.password) {

      this.authService.basicLogin(val.username, val.password)
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

            this.router.navigateByUrl('');
          }
        );

    }
  }
}
