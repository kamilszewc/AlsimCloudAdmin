import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "./groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {Group} from "../group";
import {NgForm} from "@angular/forms";
import {interval} from "rxjs";

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements AfterViewInit {

  groups = new MatTableDataSource<Group>([]);
  @ViewChild('groupsPaginator') groupsPaginator!: MatPaginator;
  @ViewChild('groupsTable', {read: MatSort}) groupsSort!: MatSort;
  displayedColumns: string[] = ['id', 'name', 'tokenBalance', 'priority', 'maxNumberOfRunningTasks', 'details'];
  newGroup: Group;
  @ViewChild('newGroupForm') newGroupForm! : NgForm;

  constructor(private router: Router,
              private groupsService: GroupsService) {
    this.newGroup = new class implements Group {
      id = null;
      maxNumberOfRunningTasks =  10;
      name = null;
      priority = 0;
      tokenBalance =  0;
    }
  }

  ngAfterViewInit(): void {
    this.getGroups()
    interval(60000).subscribe(value => {
      this.getGroups();
    });
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

  addNewGroup() {
    this.groupsService.addNewGroup(this.newGroup)
      .subscribe(group => {
        window.location.reload();
      })
  }

}
