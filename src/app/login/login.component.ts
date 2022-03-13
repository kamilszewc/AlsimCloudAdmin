import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validator, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginForm: FormGroup;

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
        .subscribe(
          () => {
            console.log("User is logged in");
            this.router.navigateByUrl('/');
          }
        );
    }
  }
}
