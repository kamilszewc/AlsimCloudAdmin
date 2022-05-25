import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectGroup, ObjectGroupsService} from "./object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {interval} from "rxjs";

@Component({
  selector: 'app-object-groups',
  templateUrl: './object-groups.component.html',
  styleUrls: ['./object-groups.component.css']
})
export class ObjectGroupsComponent implements OnInit {

  groups = new MatTableDataSource<ObjectGroup>([]);
  @ViewChild('groupsPaginator') groupsPaginator!: MatPaginator;
  @ViewChild('groupsTable', {read: MatSort}) groupsSort!: MatSort;
  displayedColumns: string[] = ['id', 'size', 'quota', 'owner', 'creationTime', 'modificationTime', 'isPublic', 'details'];

  constructor(private router: Router,
              private objectsService: ObjectGroupsService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getGroups()
    interval(60000).subscribe(value => {
      this.getGroups();
    });
  }

  getGroups() {
    this.objectsService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;
      console.log(token)

      this.objectsService.getGroups(token).subscribe(groups => {
        this.groups = new MatTableDataSource<ObjectGroup>(groups)
        this.groups.paginator = this.groupsPaginator
        this.groups.sort = this.groupsSort;
        console.log(groups)
      });
    });
  }

  goTo(id: string) {
    this.router.navigate(['object-group', id])
  }

}
