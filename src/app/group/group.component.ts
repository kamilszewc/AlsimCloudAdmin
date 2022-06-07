import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Group} from "../group";
import {GroupService} from "./group.service";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";
import {ECubes, ECubesCreation} from "../user/user.service";
import {NgForm} from "@angular/forms";

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

  eCubes = new MatTableDataSource<ECubes>([])
  @ViewChild('eCubesPaginator') eCubesPaginator!: MatPaginator;
  @ViewChild('eCubesTable', {read: MatSort}) eCubesSort!: MatSort;
  displayedECubesColumns: string[] = ['id', 'amount', 'startTime', 'expirationTime', 'removeECubes'];
  areECubesLoading = true;

  @ViewChild('eCubesRechargeForm') eCubesRechargeForm! : NgForm;
  newECubePool: ECubesCreation = new class implements ECubesCreation {
    amount = 0;
    numberOfDays = 366;
  }

  constructor(private route: ActivatedRoute,
              private groupService: GroupService,
              private router: Router,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getGroup(this.id)

    this.groupService.getListOfUsers(this.id).subscribe(users => {
      this.users = new MatTableDataSource<User>(users);
      this.users.sort = this.usersSort
      this.users.paginator = this.usersPaginator
    })

    this.getECubes();
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

  getECubes() {
    this.groupService.getECubes(this.id!).subscribe(eCubes => {
      this.eCubes = new MatTableDataSource<ECubes>(eCubes);
      this.eCubes.sort = this.eCubesSort;
      this.eCubes.paginator = this.eCubesPaginator;
      this.areECubesLoading = false;
    })
  }

  addECubes() {
    this.groupService.addECubes(this.newECubePool, this.id!).subscribe(
      message => {
        this.getGroup(this.id)
        this.getECubes()
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
      })
  }

  removeECubes(id: number) {
    this.groupService.removeECubes(id).subscribe(
      message => {
        this.getGroup(this.id)
        this.getECubes()
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
      })
  }
}
