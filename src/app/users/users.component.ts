import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UsersService} from "./users.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {MatSort} from "@angular/material/sort";
import {Route, Router} from "@angular/router";
import {interval} from "rxjs";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements AfterViewInit {

  @ViewChild('essPaginator') essPaginator!: MatPaginator;
  @ViewChild('essTable', {read: MatSort}) essSort!: MatSort;
  @ViewChild('alsimPaginator') alsimPaginator!: MatPaginator;
  @ViewChild('alsimTable', {read: MatSort}) alsimSort!: MatSort;
  @ViewChild('dynairixPaginator') dynairixPaginator!: MatPaginator;
  @ViewChild('dynairixTable', {read: MatSort}) dynairixSort!: MatSort;
  @ViewChild('allPaginator') allPaginator!: MatPaginator;
  @ViewChild('allTable', {read: MatSort}) allSort!: MatSort;
  @ViewChild('adminPaginator') adminPaginator!: MatPaginator;
  @ViewChild('adminTable', {read: MatSort}) adminSort!: MatSort;

  displayedColumns: string[] = ['id', 'username', 'email', 'firstName', 'secondName', 'group', 'details'];

  essUsers = new MatTableDataSource<User>([]);
  alsimUsers = new MatTableDataSource<User>([]);
  dynairixUsers = new MatTableDataSource<User>([]);
  allUsers = new MatTableDataSource<User>([]);
  adminUsers = new MatTableDataSource<User>([]);

  constructor(private usersService: UsersService,
              private router: Router) {
  }

  ngAfterViewInit(): void {
    this.getEssUsers();
    this.getAlsimUsers();
    this.getDynairixUsers();
    this.getAllUsers();
    this.getAdminUsers();
    interval(60000).subscribe(value => {
      this.getEssUsers();
      this.getAlsimUsers();
      this.getDynairixUsers();
      this.getAllUsers();
      this.getAdminUsers();
    });
  }

  getEssUsers() {
    this.usersService.getEssUsers().subscribe(users => {
      this.essUsers = new MatTableDataSource<User>(users)
      this.essUsers.paginator = this.essPaginator
      this.essUsers.sort = this.essSort;
    })
  }

  getAlsimUsers() {
    this.usersService.getAlsimUsers().subscribe(users => {
      this.alsimUsers = new MatTableDataSource<User>(users)
      this.alsimUsers.paginator = this.alsimPaginator
      this.alsimUsers.sort = this.alsimSort;
    })
  }

  getDynairixUsers() {
    this.usersService.getDynairixUsers().subscribe(users => {
      this.dynairixUsers = new MatTableDataSource<User>(users)
      this.dynairixUsers.paginator = this.dynairixPaginator
      this.dynairixUsers.sort = this.dynairixSort;
    })
  }

  getAllUsers() {
    this.usersService.getAllUsers().subscribe(users => {
      this.allUsers = new MatTableDataSource<User>(users)
      this.allUsers.paginator = this.allPaginator
      this.allUsers.sort = this.allSort;
    })
  }

  getAdminUsers() {
    this.usersService.getAdminUsers().subscribe(users => {
      this.adminUsers = new MatTableDataSource<User>(users)
      this.adminUsers.paginator = this.adminPaginator
      this.adminUsers.sort = this.adminSort;
    })
  }

  goTo(id: Number) {
    this.router.navigate(['users', id])
  }
}

