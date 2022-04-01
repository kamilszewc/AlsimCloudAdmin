import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {Router} from "@angular/router";
import {TwoFA, TwoFaService} from "./two-fa.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-two-fa',
  templateUrl: './two-fa.component.html',
  styleUrls: ['./two-fa.component.css']
})
export class TwoFAComponent implements OnInit {

  twoFA!: TwoFA;

  @ViewChild("twoFaForm") twoFaForm!: NgForm;
  code!: string;

  @ViewChild("secret") secret!: ElementRef<HTMLSpanElement>;

  @ViewChild("wrongCodeAlert") wrongCodeAlert!: ElementRef<HTMLDivElement>;

  constructor(private twoFaService: TwoFaService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit(): void {
    this.twoFaService.getQtCode().subscribe(message => {
      this.twoFA = message;
      console.log(this.twoFA)
    })
  }

  apply() {
    console.log(this.code)
    this.twoFaService.enableTwoFa(this.code).subscribe(
      message => {
        console.log(message.message)

        this.authService.isUsing2FA = true;
        this.router.navigate([''])
      },
      error => {
        this.wrongCodeAlert.nativeElement.hidden = false;
      }
    )
  }

  hideAlert() {
    this.wrongCodeAlert.nativeElement.hidden = true;
  }

  showSecret() {
    this.secret.nativeElement.textContent = this.twoFA.secret;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login'])
  }

}
