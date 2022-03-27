import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../group";
import {GroupService} from "./group.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {

  id!: number;
  group!: Group;
  isEditAllowed = false;
  isRemovalAllowed = false;

  @ViewChild('usersPaginator') usersPaginator!: MatPaginator;
  @ViewChild('usersTable', {read: MatSort}) usersSort!: MatSort;
  users = new MatTableDataSource<User>([]);
  displayedColumns: string[] = ['id', 'username', 'email', 'firstName', 'secondName', 'details'];

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private router: Router) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.groupService.getGroup(this.id).subscribe(group => {
      this.group = group;
    })

    this.groupService.getListOfUsers(this.id).subscribe(users => {
      this.users = new MatTableDataSource<User>(users);
      this.users.sort = this.usersSort
      this.users.paginator = this.usersPaginator
    })
  }

  getGroup(id: number) {
    this.groupService.getGroup(id).subscribe(group => {
      this.group = group;
    })
  }

  removeGroup() {
    this.groupService.removeGroup(this.id).subscribe(response => {
      this.router.navigate(['groups'])
    })
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  blockRemoval() {
    this.isRemovalAllowed = false;
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  blockEdit() {
    this.isEditAllowed = false;
  }

  editGroup() {
    const groupToSubmit = this.group;
    if (this.group.priority == null) groupToSubmit.priority = -1;
    if (this.group.maxNumberOfRunningTasks == null) groupToSubmit.maxNumberOfRunningTasks = -1;

    this.groupService.editGroup(this.id, groupToSubmit).subscribe(group => {
      //this.group = group;
      window.location.reload();
    })
  }

  reload() {
    window.location.reload();
  }

  goToUser(id: number) {
    this.router.navigate(['users', id])
  }
}
