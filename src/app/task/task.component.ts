import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TaskService} from "./task.service";
import {NgForm} from "@angular/forms";
import {Task} from "../task"
import {AlarmDialogMessage, AlarmDialogService} from "../alarm-dialog/alarm-dialog.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  id: number | undefined;
  task: Task | undefined
  isEditAllowed = false;
  isStopAllowed = false;
  isStopHidden = true;

  @ViewChild('taskForm') taskForm! : NgForm;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private taskService: TaskService,
              private alarmDialogService: AlarmDialogService) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(this.id).subscribe(task => {
      this.task = task;
      if (task.status == 'running' || task.status == 'in queue' || task.status == 'in soft queue') {
        this.isStopHidden = false;
      }
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

  allowStop() {
    this.isStopAllowed = true;
  }

  stop() {

    this.taskService.stopTask(this.id!, "Stopped by admin").subscribe(
      message => {
        this.isStopAllowed = false;
        this.isStopHidden = true;
      },
      error => {
        const dialogMessage = new class implements AlarmDialogMessage {
          title = "Error"
          message = error.error.message
        };
        this.alarmDialogService.open(dialogMessage);
        this.isStopAllowed = false;
      }
    )
  }

  reload() {
    window.location.reload();
  }

  goToFiles(id: number) {
    this.router.navigate(['storage', id]);
  }
}
