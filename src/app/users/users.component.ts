import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { UsersService } from "./users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  @ViewChild('essPaginator') essPaginator!: MatPaginator;
  @ViewChild('alsimPaginator') alsimPaginator!: MatPaginator;
  @ViewChild('dynairixPaginator') dynairixPaginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'username', 'email', 'firstName', 'secondName'];

  essUsers = new MatTableDataSource<User>([]);
  alsimUsers = new MatTableDataSource<User>([]);
  dynairixUsers = new MatTableDataSource<User>([]);

  constructor(private usersService: UsersService) {
  }

  ngAfterViewInit(): void {
    this.getEssUsers()
    this.getAlsimUsers()
    this.getDynairixUsers()
  }

  getEssUsers() {
    this.usersService.getEssUsers().subscribe(users => {
      this.essUsers = new MatTableDataSource<User>(users)
      this.essUsers.paginator = this.essPaginator
    })
  }

  getAlsimUsers() {
    this.usersService.getAlsimUsers().subscribe(users => {
      this.alsimUsers = new MatTableDataSource<User>(users)
      this.alsimUsers.paginator = this.alsimPaginator
    })
  }

  getDynairixUsers() {
    this.usersService.getDynairixUsers().subscribe(users => {
      this.dynairixUsers = new MatTableDataSource<User>(users)
      this.dynairixUsers.paginator = this.dynairixPaginator
    })
  }
}

