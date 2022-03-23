import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {TasksService} from "./tasks.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  @ViewChild('allTasksPaginator') allTasksPaginator!: MatPaginator;
  @ViewChild('allTasksTable', {read: MatSort}) allTasksSort!: MatSort;
  allTasks = new MatTableDataSource<Task>([]);

  displayedColumns: string[] = ['id', 'name', 'status', 'progress', 'user', 'schema', 'resource', 'files', 'details'];

  constructor(private tasksService: TasksService,
              private router: Router) { }

  ngOnInit(): void {
    this.getAllTasks()
  }

  getAllTasks() {
    this.tasksService.getAllTasks()
      .subscribe(allTasks => {
        this.allTasks = new MatTableDataSource<Task>(allTasks)
        this.allTasks.sort = this.allTasksSort;
        this.allTasks.paginator = this.allTasksPaginator;
      })
  }

  goTo(id: number) {
    this.router.navigate(['task', id]);
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }

}
