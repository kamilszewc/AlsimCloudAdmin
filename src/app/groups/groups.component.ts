import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../user/user.service";
import {GroupsService} from "./groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {Group} from "../group";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements AfterViewInit {

  @ViewChild('groupsPaginator') groupsPaginator!: MatPaginator;
  @ViewChild('groupsTable', {read: MatSort}) groupsSort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'tokenBalance', 'priority', 'maxNumberOfRunningTasks', 'details'];

  groups = new MatTableDataSource<Group>([]);

  constructor(private router: Router,
              private groupsService: GroupsService) { }

  ngAfterViewInit(): void {
    this.getGroups()
  }

  getGroups() {
    this.groupsService.getAllGroups().subscribe(groups => {
      this.groups = new MatTableDataSource<Group>(groups)
      this.groups.paginator = this.groupsPaginator
      this.groups.sort = this.groupsSort;
    })
  }

  goTo(id: Number) {
    this.router.navigate(['group', id])
  }

}
