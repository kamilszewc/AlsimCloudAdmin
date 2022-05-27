import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ObjectGroup, ObjectGroupsService} from "./object-groups.service";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {interval} from "rxjs";
import {NgForm} from "@angular/forms";
import {Schema} from "../schema";
import {Myfile} from "../myfile";
import {SchemaCategory} from "../schemaCategory";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

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

  @ViewChild('newGroupForm') newGroupForm! : NgForm;
  newGroup: ObjectGroup = new class implements ObjectGroup {
    id: string | null = "";
    description: string | null = "";
    owner: string = "";
    permission: string = "";
    isPublic: boolean = false;
    quota: number | null = null;
    size: number | null = null;
    creationTime: string | null = null;
    modificationTime: string | null = null;
  }

  constructor(private router: Router,
              private objectsGroupsService: ObjectGroupsService,
              private route: ActivatedRoute,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.getGroups()
    interval(60000).subscribe(value => {
      this.getGroups();
    });
  }

  getGroups() {
    this.objectsGroupsService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;
      console.log(token)

      this.objectsGroupsService.getGroups(token).subscribe(groups => {
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

  addNewGroup() {
    console.log(this.newGroup);
    this.objectsGroupsService.generateObjectsRepositoryToken().subscribe(message => {
      // Get token
      let token = message.message;

      this.objectsGroupsService.createGroup(this.newGroup, token).subscribe(
        group => {
          window.location.reload();
        },
        error => {
          const dialogMessage = new class implements AlarmDialogMessage {
            title = "Error"
            message = error.error.message
          };
          this.alarmDialogService.open(dialogMessage);
        });
    });
  }
}
