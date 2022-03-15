import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;
  @ViewChild('wrongCredentialAlert') wrongCredentialAlert!: ElementRef;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {

    this.loginForm = this.formBuilder.group({
      password: ['', Validators.required]
    })
  }

  login() {
    const val = this.loginForm.value;

    if (val.password) {
      //this.authService.login(val.password)
      this.authService.login(val.password)
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
            this.router.navigateByUrl('');
          }
        );

      // if (this.authService.isLoggedOut()) {
      //   this.wrongCredentialAlert.nativeElement.hidden = false;
      // }
    }
  }
}
