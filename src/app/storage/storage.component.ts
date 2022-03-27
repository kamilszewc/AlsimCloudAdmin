import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../user";
import {StorageFile} from "../storageFile";
import {ActivatedRoute, Router} from "@angular/router";
import {StorageService} from "./storage.service";
import {GlobalConstants} from "../common/global-constants";

@Component({
  selector: 'app-storage',
  templateUrl: './storage.component.html',
  styleUrls: ['./storage.component.css']
})
export class StorageComponent implements OnInit {

  apiUrl = GlobalConstants.apiUrl;

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

  displayedColumns: string[] = ['filename', 'size', 'isUploaded', 'mediaType', 'checksum', 'download', 'remove'];

  token!: string;

  constructor(private router: Router,
              private storageService: StorageService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    if (Number(this.route.snapshot.paramMap.has('id'))) {
      this.taskId = Number(this.route.snapshot.paramMap.get('id'))
      this.findFiles();
    }
  }

  findFilesFromForm() {
    this.taskId = this.findFilesByTaskIdForm.value.taskId;
    this.findFiles();
  }

  findFiles() {
    this.storageService.generateStorageManagerToken(this.taskId).subscribe(message => {
      // Get token
      this.token = message.message;

      // Get input files
      this.storageService.getInputFiles(this.token).subscribe(files => {
        this.inputFiles = new MatTableDataSource<StorageFile>(files);
        this.inputFiles.paginator = this.inputFilesPaginator;
        this.inputFiles.sort = this.inputFilesSort;
        console.log(files)
      })

      // Get output files
      this.storageService.getOutputFiles(this.token).subscribe(files => {
        this.outputFiles = new MatTableDataSource<StorageFile>(files);
        this.outputFiles.paginator = this.outputFilesPaginator;
        this.outputFiles.sort = this.outputFilesSort;
      })

      // Get log files
      this.storageService.getLogFiles(this.token).subscribe(files => {
        this.logFiles = new MatTableDataSource<StorageFile>(files);
        this.logFiles.paginator = this.logFilesPaginator;
        this.logFiles.sort = this.logFilesSort;
      })
    })
  }

  goTo() {
  }

  removeInput(name: string) {
    this.storageService.removeFile(name, this.token, 'INPUT').subscribe(message => {
      window.location.reload();
    })
  }

  removeOutput(name: string) {
    this.storageService.removeFile(name, this.token, 'OUTPUT').subscribe(message => {
      window.location.reload();
    })
  }

  removeLog(name: string) {
    this.storageService.removeFile(name, this.token, 'LOG').subscribe(message => {
      window.location.reload();
    })
  }

}
