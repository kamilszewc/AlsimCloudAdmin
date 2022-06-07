import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../user";
import {ECubes, ECubesCreation, UserService} from "./user.service";
import {Task} from "../task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HistoricalTask} from "../historicalTask";
import {NgForm} from "@angular/forms";
import {catchError} from "rxjs";
import {Group} from "../group";
import {Schema} from "../schema";
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: number | undefined
  user: User | undefined;
  isEditAllowed = false;
  isRemovalAllowed = false;
  countries: Map<string, string> | undefined;
  userTypes!: string[];
  groups!: string[];
  areTasksLoading = true;

  displayedTasksColumns: string[] = ['id', 'name', 'status', 'progress', 'schema', 'resource', 'files', 'details'];
  displayedHistoricalTasksColumns: string[] = ['id', 'name', 'numberOfCpus', 'numberOfGpus', 'ramMemory', 'schemaId', 'resourceId', 'createDateTime'];
  userTasks = new MatTableDataSource<Task>([]);
  userHistoricalTasks = new MatTableDataSource<HistoricalTask>([]);

  @ViewChild('userTasksPaginator') userTasksPaginator!: MatPaginator;
  @ViewChild('userTasksTable', {read: MatSort}) userTasksSort!: MatSort;
  @ViewChild('userHistoricalTasksPaginator') userHistoricalTasksPaginator!: MatPaginator;
  @ViewChild('userHistoricalTasksTable', {read: MatSort}) userHistoricalTasksSort!: MatSort;

  @ViewChild('userForm') userForm! : NgForm;
  @ViewChild('userTokensRechargeForm') userTokensRechargeForm! : NgForm;
  @ViewChild('groupTokensRechargeForm') groupTokensRechargeForm! : NgForm;

  permittedSchemas = new MatTableDataSource<Schema>([])
  @ViewChild('permittedSchemasPaginator') permittedSchemasPaginator!: MatPaginator;
  @ViewChild('permittedSchemasTable', {read: MatSort}) permittedSchemasSort!: MatSort;
  displayedPermittedSchemasColumns: string[] = ['id', 'name', 'paymentMethod', 'solverGroup', 'details', 'disallow'];

  notPermittedSchemas = new MatTableDataSource<Schema>([])
  @ViewChild('notPermittedSchemasPaginator') notPermittedSchemasPaginator!: MatPaginator;
  @ViewChild('notPermittedSchemasTable', {read: MatSort}) notPermittedSchemasSort!: MatSort;
  displayedNotPermittedSchemasColumns: string[] = ['id', 'name', 'paymentMethod', 'solverGroup', 'details', 'allow'];

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
              private router: Router,
              private userService: UserService,
              private alarmDialogService: AlarmDialogService) {
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.getUser();

    this.userService.getCountries().subscribe(countries => {
      this.countries = countries;
    });

    this.userService.getAllGroups().subscribe(groups => {
      this.groups = groups.map<string>(group => group.name!)
    })

    this.userService.getUserTypes().subscribe(userTypes => {
      this.userTypes = userTypes;
    })

    this.getECubes()

    this.userService.getUserTasks(this.id).subscribe(userTasks => {
      this.userTasks = new MatTableDataSource<Task>(userTasks);
      this.userTasks.sort = this.userTasksSort;
      this.userTasks.paginator = this.userTasksPaginator;
      this.areTasksLoading = false;
    })

    this.userService.getUserHistoricalTasks(this.id).subscribe(userHistoricalTasks => {
      this.userHistoricalTasks = new MatTableDataSource<HistoricalTask>(userHistoricalTasks);
      this.userHistoricalTasks.sort = this.userHistoricalTasksSort;
      this.userHistoricalTasks.paginator = this.userHistoricalTasksPaginator;
    })

    this.getUserSchemas();
  }

  getUser() {
    this.userService.getUser(this.id!).subscribe((user: User) => {
      this.user = user;
    })
  }

  getECubes() {
    this.userService.getECubes(this.id!).subscribe(eCubes => {
      this.eCubes = new MatTableDataSource<ECubes>(eCubes);
      this.eCubes.sort = this.eCubesSort;
      this.eCubes.paginator = this.eCubesPaginator;
      this.areECubesLoading = false;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  blockEdit() {
    this.isEditAllowed = false;
  }

  editUser() {
    console.info(this.userForm.value)

    let value = this.userForm.value;
    if (value.priority == null) value.priority = -1;
    if (value.maxNumberOfRunningTasks == null) value.maxNumberOfRunningTasks = -1;

    this.userService.editUser(this.id!, value)
      .subscribe(
        (user) => {
          this.user = user
          this.blockEdit();
        },
        (error) => {
          console.info(error.error.message)
        }
      );
  }

  getUserSchemas() {
    this.userService.getUserSchemas(this.id!).subscribe(userSchemas => {
      this.permittedSchemas = new MatTableDataSource<Schema>(userSchemas.permitted!);
      this.permittedSchemas.sort = this.permittedSchemasSort
      this.permittedSchemas.paginator = this.permittedSchemasPaginator

      this.notPermittedSchemas = new MatTableDataSource<Schema>(userSchemas.notPermitted!);
      this.notPermittedSchemas.sort = this.notPermittedSchemasSort
      this.notPermittedSchemas.paginator = this.notPermittedSchemasPaginator
    })
  }

  allowSchema(schemaId: number) {
    this.userService.allowSchema(this.id!, schemaId).subscribe(message => {
      this.getUserSchemas();
    })
  }

  disallowSchema(schemaId: number) {
    this.userService.disallowSchema(this.id!, schemaId).subscribe(message => {
      this.getUserSchemas();
    })
  }

  allowRemoval() {
    this.isRemovalAllowed = true;
  }

  deleteUser() {
    this.userService.deleteUser(this.id!)
      .subscribe(message => {

        this.router.navigate(['users'])
      })
  }

  reload() {
    window.location.reload();
  }

  goToTask(id: number) {
    this.router.navigate(['task', id])
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }

  toGb(ramMemory: number) {
    return ramMemory / 1024 / 1024 | 0
  }

  goToSchema(id: number) {
    this.router.navigate(['schema', id]);
  }

  addECubes() {

    this.userService.addECubes(this.newECubePool, this.id!).subscribe(
      message => {
        this.getUser()
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
    this.userService.removeECubes(id).subscribe(
      message => {
        this.getUser()
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

  goToGroupInfo() {
    this.router.navigate(['group', this.user?.consumerGroupId])
  }
}
