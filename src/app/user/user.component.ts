import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {User} from "../user";
import {UserService} from "./user.service";
import {Task} from "../task";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {HistoricalTask} from "../historicalTask";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  id: number | undefined
  user: User | undefined;
  isEditAllowed = false;
  countries: Map<string, string> | undefined;
  userTypes!: string[];

  displayedTasksColumns: string[] = ['id', 'name', 'status', 'progress', 'schema', 'resource', 'details'];
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

  constructor(private route: ActivatedRoute,
              private router: Router,
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

    this.userService.getUserTasks(this.id).subscribe(userTasks => {
      this.userTasks = new MatTableDataSource<Task>(userTasks);
      this.userTasks.sort = this.userTasksSort;
      this.userTasks.paginator = this.userTasksPaginator;
    })

    this.userService.getUserHistoricalTasks(this.id).subscribe(userHistoricalTasks => {
      this.userHistoricalTasks = new MatTableDataSource<HistoricalTask>(userHistoricalTasks);
      this.userHistoricalTasks.sort = this.userHistoricalTasksSort;
      this.userHistoricalTasks.paginator = this.userHistoricalTasksPaginator;
    })
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  editUser() {
    console.info(this.userForm.value)

    this.userService.editUser(this.id!, this.userForm.value)
      .subscribe(user => this.user = user);

    //window.location.reload();
  }

  giveUserTokens() {
    this.userService.addUserTokens(this.id!, this.userTokensRechargeForm.value.tokensToBeAddedRemoved)
      .subscribe(user => this.user = user);
  }

  takeUserTokens() {
    this.userService.delUserTokens(this.id!, this.userTokensRechargeForm.value.tokensToBeAddedRemoved)
      .subscribe(user => this.user = user);
  }

  giveGroupTokens() {
    this.userService.addGroupTokens(this.id!, this.groupTokensRechargeForm.value.tokensToBeAddedRemoved)
      .subscribe(user => this.user = user);
  }

  takeGroupTokens() {
    this.userService.delGroupTokens(this.id!, this.groupTokensRechargeForm.value.tokensToBeAddedRemoved)
      .subscribe(user => this.user = user);
  }

  reload() {
    window.location.reload();
  }

  goToTask(id: number) {
    this.router.navigate(['task', id])
  }
}
