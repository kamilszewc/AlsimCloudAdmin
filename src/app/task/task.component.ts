import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "./task.service";
import {NgForm} from "@angular/forms";
import {Task} from "../task"

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id: number | undefined;
  task: Task | undefined
  isEditAllowed = false;

  @ViewChild('taskForm') taskForm! : NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(this.id).subscribe(task => {
      this.task = task;
    })
  }

  editTask() {
    console.info(this.taskForm.value)

    this.taskService.editTask(this.id!, this.taskForm.value)
      .subscribe(task => this.task = task);

    window.location.reload();
  }

  allowEdit() {
    this.isEditAllowed = true;
  }

  reload() {
    window.location.reload();
  }
}
