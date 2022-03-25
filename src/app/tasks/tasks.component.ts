import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TasksService} from "./tasks.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {NgForm} from "@angular/forms";

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
  status: string = "unknown";
  @ViewChild('findTasksByUserIdForm') findTasksByUserIdForm!: NgForm;
  @ViewChild('findTasksByGroupIdForm') findTasksByGroupIdForm!: NgForm;
  @ViewChild('findTasksBySchemaIdForm') findTasksBySchemaIdForm!: NgForm;
  @ViewChild('findTasksByStatusForm') findTasksByStatusForm!: NgForm;

  condition: string = "";
  @ViewChild('allTasksPaginator') allTasksPaginator!: MatPaginator;
  @ViewChild('allTasksTable', {read: MatSort}) allTasksSort!: MatSort;
  allTasks = new MatTableDataSource<Task>([]);
  displayedColumns: string[] = ['id', 'name', 'status', 'progress', 'user', 'schema', 'resource', 'files', 'details'];
  isTableVisible = false;
  isLoading = true;

  constructor(private tasksService: TasksService,
              private router: Router) { }

  ngOnInit(): void {
  }

  findTasksBySchemaId() {
    if (this.schemaId > 0) {
      this.isTableVisible = true;
      this.condition = "schema id = " + this.schemaId;
      this.tasksService.findTasksBySchemaId(this.schemaId)
        .subscribe(allTasks => {
          this.allTasks = new MatTableDataSource<Task>(allTasks)
          this.allTasks.sort = this.allTasksSort;
          this.allTasks.paginator = this.allTasksPaginator;
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
          this.allTasks = new MatTableDataSource<Task>(allTasks)
          this.allTasks.sort = this.allTasksSort;
          this.allTasks.paginator = this.allTasksPaginator;
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
          this.allTasks = new MatTableDataSource<Task>(allTasks)
          this.allTasks.sort = this.allTasksSort;
          this.allTasks.paginator = this.allTasksPaginator;
          this.isLoading = false;
        })
    }
  }

  findTasksByStatus() {
    this.isTableVisible = true;
    this.condition = "status = " + this.status;
    this.tasksService.findTasksByStatus(this.status)
      .subscribe(allTasks => {
        this.allTasks = new MatTableDataSource<Task>(allTasks)
        this.allTasks.sort = this.allTasksSort;
        this.allTasks.paginator = this.allTasksPaginator;
        this.isLoading = false;
      })
  }

  getAllTasks() {
    this.isTableVisible = true;
    this.tasksService.getAllTasks()
      .subscribe(allTasks => {
        this.allTasks = new MatTableDataSource<Task>(allTasks)
        this.allTasks.sort = this.allTasksSort;
        this.allTasks.paginator = this.allTasksPaginator;
        this.isLoading = false;
      })
  }

  goTo(id: number) {
    this.router.navigate(['task', id]);
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }


}
