import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {StorageFile} from "../storageFile";
import {Router} from "@angular/router";
import {StorageService} from "./storage.service";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  @ViewChild('findFilesByTaskIdForm') findFilesByTaskIdForm!: NgForm;
  taskId!: number;

  @ViewChild('inputFilesPaginator') inputFilesPaginator!: MatPaginator;
  @ViewChild('inputFilesTable', {read: MatSort}) inputFilesSort!: MatSort;
  inputFiles = new MatTableDataSource<StorageFile>([]);

  @ViewChild('outputFilesPaginator') outputFilesPaginator!: MatPaginator;
  @ViewChild('outputFilesTable', {read: MatSort}) outputFilesSort!: MatSort;
  outputFiles = new MatTableDataSource<StorageFile>([]);

  @ViewChild('logFilesPaginator') logFilesPaginator!: MatPaginator;
  @ViewChild('logFilesTable', {read: MatSort}) logFilesSort!: MatSort;
  logFiles = new MatTableDataSource<StorageFile>([]);

  displayedColumns: string[] = ['name', 'details'];

  token!: string;

  constructor(private router: Router,
              private storageService: StorageService) { }

  ngOnInit(): void {
  }

  findFiles() {
    this.taskId = this.findFilesByTaskIdForm.value.taskId;

    console.log(this.taskId)

    this.storageService.generateStorageManagerToken(this.taskId).subscribe(message => {
      // Get token
      this.token = message.message;
      console.log(this.token)

      // Get input files

      // Get output files

      // Get log files
    })
  }

  goTo() {

  }

}