import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {QueueEntry} from "../queueEntry";
import {Router} from "@angular/router";
import {QueueService} from "./queue.service";
import {Resource} from "../resource";

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.css']
})
export class QueueComponent implements OnInit {

  @ViewChild('queuePaginator') queuePaginator!: MatPaginator;
  @ViewChild('queueTable', {read: MatSort}) queueSort!: MatSort;
  queue = new MatTableDataSource<QueueEntry>([]);

  displayedColumns: string[] = ['id', 'taskId', 'solverGroup', 'numberOfCpus', 'numberOfGpus', 'ramMemory', 'priority', 'risePriority', 'dropPriority', 'remove'];

  constructor(private queueService: QueueService,
              private router: Router) { }

  ngOnInit(): void {
    this.getQueue();
  }

  getQueue() {
    this.queueService.getQueue()
      .subscribe(queue => {
        this.queue = new MatTableDataSource<QueueEntry>(queue)
        this.queue.sort = this.queueSort;
        this.queue.paginator = this.queuePaginator;
      })
  }

  risePriority(id: number) {
    this.queueService.risePriority(id).subscribe(response => {
      window.location.reload();
    });
  }

  dropPriority(id: number) {
    this.queueService.dropPriority(id).subscribe(response => {
      window.location.reload();
    });
  }

  setPriority(id: number, priority: number) {
    this.queueService.setPriority(id, priority).subscribe(response => {
      window.location.reload();
    });
  }

  deleteEntry(id: number) {
    this.queueService.deleteEntry(id).subscribe(response => {
      window.location.reload();
    });
  }
}
