import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TasksService} from "./tasks.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";
import {interval} from "rxjs";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  statuses: string[] = ['unknown', 'running', 'crashed', 'stopped', 'finished', 'not running']

  userId!: number;
  groupId!: number;
  schemaId!: number;
  resourceId!: number;
  taskId!: number;
  status: string = "unknown";
  @ViewChild('findTasksByUserIdForm') findTasksByUserIdForm!: NgForm;
  @ViewChild('findTasksByGroupIdForm') findTasksByGroupIdForm!: NgForm;
  @ViewChild('findTasksBySchemaIdForm') findTasksBySchemaIdForm!: NgForm;
  @ViewChild('findTasksByStatusForm') findTasksByStatusForm!: NgForm;
  @ViewChild('findTasksByResourceIdForm') findTasksByResourceIdForm!: NgForm;
  @ViewChild('findTasksByTaskIdForm') findTasksByTaskIdForm!: NgForm;


  condition: string = "";
  @ViewChild('searchTasksPaginator') searchTasksPaginator!: MatPaginator;
  @ViewChild('searchTasksTable', {read: MatSort}) searchTasksSort!: MatSort;
  searchTasks = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['id', 'name', 'status', 'progress', 'user', 'schema', 'resource', 'files', 'details'];
  isTableVisible = false;
  isLoading = true;

  @ViewChild('allTasksPaginator') allTasksPaginator!: MatPaginator;
  @ViewChild('allTasksTable', {read: MatSort}) allTasksSort!: MatSort;
  allTasks = new MatTableDataSource<Task>([]);
  isLoadingAllTasks = true;

  @ViewChild('runningTasksPaginator') runningTasksPaginator!: MatPaginator;
  @ViewChild('runningTasksTable', {read: MatSort}) runningTasksSort!: MatSort;
  runningTasks = new MatTableDataSource<Task>([]);
  isLoadingRunningTasks = true;

  constructor(private tasksService: TasksService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllTasks();
    interval(60000).subscribe(value => {
      this.getAllTasks();
    });

    this.getRunningTasks();
    interval(60000).subscribe(value => {
      this.getRunningTasks();
    });
  }

  findTasksBySchemaId() {
    if (this.schemaId > 0) {
      this.isTableVisible = true;
      this.condition = "schema id = " + this.schemaId;
      this.tasksService.findTasksBySchemaId(this.schemaId)
        .subscribe(allTasks => {
          this.searchTasks = new MatTableDataSource<Task>(allTasks)
          this.searchTasks.sort = this.searchTasksSort;
          this.searchTasks.paginator = this.searchTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  findTasksByUserId() {
    if (this.userId > 0) {
      this.isTableVisible = true;
      this.condition = "user id = " + this.userId;
      this.tasksService.findTasksByUserId(this.userId)
        .subscribe(allTasks => {
          this.searchTasks = new MatTableDataSource<Task>(allTasks)
          this.searchTasks.sort = this.searchTasksSort;
          this.searchTasks.paginator = this.searchTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  findTasksByGroupId() {
    if (this.groupId > 0) {
      this.isTableVisible = true;
      this.condition = "group id = " + this.groupId;
      this.tasksService.findTasksByGroupId(this.groupId)
        .subscribe(allTasks => {
          this.searchTasks = new MatTableDataSource<Task>(allTasks)
          this.searchTasks.sort = this.searchTasksSort;
          this.searchTasks.paginator = this.searchTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  findTasksByStatus() {
    this.isTableVisible = true;
    this.condition = "status = " + this.status;
    this.tasksService.findTasksByStatus(this.status)
      .subscribe(allTasks => {
        this.searchTasks = new MatTableDataSource<Task>(allTasks)
        this.searchTasks.sort = this.searchTasksSort;
        this.searchTasks.paginator = this.searchTasksPaginator;
        this.isLoading = false;
      })
  }

  findTasksByResourceId() {
    if (this.resourceId > 0) {
      this.isTableVisible = true;
      this.condition = "resource id = " + this.resourceId;
      this.tasksService.findTasksByResourceId(this.resourceId)
        .subscribe(allTasks => {
          this.searchTasks = new MatTableDataSource<Task>(allTasks)
          this.searchTasks.sort = this.searchTasksSort;
          this.searchTasks.paginator = this.searchTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  findTasksByTaskId() {
    if (this.taskId > 0) {
      this.isTableVisible = true;
      this.condition = "task id = " + this.taskId;
      this.tasksService.findTasksByTaskId(this.taskId)
        .subscribe(allTasks => {
          this.searchTasks = new MatTableDataSource<Task>(allTasks)
          this.searchTasks.sort = this.searchTasksSort;
          this.searchTasks.paginator = this.searchTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  getAllTasks() {
    this.tasksService.getAllTasks()
      .subscribe(allTasks => {
        this.allTasks = new MatTableDataSource<Task>(allTasks)
        this.allTasks.sort = this.allTasksSort;
        this.allTasks.paginator = this.allTasksPaginator;
        this.isLoadingAllTasks = false;
      })
  }

  getRunningTasks() {
    this.tasksService.findTasksByStatus("running")
      .subscribe(runningTasks => {
        this.runningTasks = new MatTableDataSource<Task>(runningTasks)
        this.runningTasks.sort = this.runningTasksSort;
        this.runningTasks.paginator = this.runningTasksPaginator;
        this.isLoadingRunningTasks = false;
      })
  }

  goTo(id: number) {
    this.router.navigate(['task', id]);
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }


}
