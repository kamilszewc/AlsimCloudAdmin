import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../user";
import {UserService} from "./user.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id!: number
  user!: User
  isEditAllowed = false;
  countries!: Map<string, string>;
  userTypes!: string[];

  constructor(private route: ActivatedRoute,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUser(this.id).subscribe((user: User) => {
      this.user = user;
    })

    this.userService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.userService.getUserTypes().subscribe(userTypes => {
      this.userTypes = userTypes;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  editUser(data: any) {
    this.isEditAllowed = false;
    console.info(data)
  }

  reload() {
    window.location.reload();
  }
}
